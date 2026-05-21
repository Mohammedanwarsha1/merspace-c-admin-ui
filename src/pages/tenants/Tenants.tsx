import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Space,
  Spin,
  Table,
  theme,
  Typography,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import { Link, Navigate } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTenant, getTenants } from "../../http/api";
import { useAuthStore } from "../../store";
import { TenantFilter } from "./TenantFilter";
import React from "react";
import type { CreateTenantData, FieldData } from "../../types";
import TenantForm from "./form/TenantForm";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";
const Tenants = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [queryParams, setQueryParams] = React.useState({
    perPage: PER_PAGE,
    currentpage: 1,
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const {
    data: tenants,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["tenants", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1]),
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>,
      ).toString();

      return getTenants(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["tenant"],
    mutationFn: async (data: CreateTenantData) =>
      createTenant(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      return;
    },
  });
  const onHandleSubmit = async () => {
    await form.validateFields();
    await tenantMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };
  const debounceChange = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value }));
    }, 1000);
  }, []);

  const onFilterChange = (changedFeilds: FieldData[]) => {
    const changedFilterfeilds = changedFeilds
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});

    if ("q" in changedFilterfeilds) {
      debounceChange(changedFilterfeilds.q);
    } else {
      setQueryParams((prev) => ({ ...prev, ...changedFilterfeilds }));
    }
  };

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: "Users" },
            ]}
          />
          {isFetching && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {isError && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Flex>

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <TenantFilter>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Add Restaurent
            </Button>
          </TenantFilter>
        </Form>

        <Table
          columns={columns}
          dataSource={tenants?.data}
          rowKey={"id"}
          pagination={{
            total: tenants?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentpage,
            onChange: (page) => {
              console.log(page);
              setQueryParams((prev) => {
                return {
                  ...prev,
                  currentpage: page,
                };
              });
            },
          }}
        />

        <Drawer
          title="Create restaurant"
          styles={{ body: { backgroundColor: colorBgLayout } }}
          size={720}
          destroyOnHidden={true}
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
          }}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <TenantForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Tenants;
