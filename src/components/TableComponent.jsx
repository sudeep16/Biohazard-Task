import React from "react";
import "../assets/styles/styles.scss";
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Select, Table } from "antd";
import { givenData } from "../fetchData/json_data.js";
import { process } from "../fetchData/json_process.js";
import { useState } from "react";
import { useEffect } from "react";
import { isEmpty } from "lodash";

const { Option } = Select;

const intervalData = [
  {
    value: "second",
    title: "Second",
  },
  {
    value: "minute",
    title: "Minute",
  },
  {
    value: "hour",
    title: "Hour",
  },
];

const TableComponent = () => {
  const [count, setCount] = useState(1);
  const [addedRow, setNewAddedRow] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const changedData = givenData?.map((item, index) => ({
      ...item,
      key: index,
    }));

    setDataSource(changedData);
  }, []);

  const defaultColumns = [
    {
      title: "Category Title",
      dataIndex: "CategoryTitle",
      // render: (title, record) => {
      //   return (
      //     <div>
      //       {dataSource.filter((item, index) => {
      //         if (dataSource[index]?.key === item?.key) {
      //           if (
      //             dataSource[index - 1]?.CategoryTitle === item?.CategoryTitle
      //           ) {
      //             return item;
      //           } else {
      //             return null;
      //           }
      //         } else {
      //           return null;
      //         }
      //       })?.length > 0 ? (
      //         ""
      //       ) : (
      //         <>{record.CategoryTitle}</>
      //       )}
      //     </div>
      //   );
      // },
      width: 180,
    },
    {
      title: "Recipe Sub Category Title",
      dataIndex: "RecipeSubCategoryTitle",
      width: 180,
    },
    {
      title: "Biological Hazard",
      dataIndex: "BiologicalHazardTitle",
      width: 180,
      render: (text, record) => {
        return (
          <a target="_blank" href={`https://www.google.com/search?q=${text}`}>
            {text}
          </a>
        );
      },
    },
    {
      title: "Ingredient Name",
      dataIndex: "IngredientName",
      width: 180,
    },
    {
      title: " ",
      width: 100,

      render: (text, record) => (
        <>
          {record?.new ? (
            <div className="d-flex justify-content-evenly ">
              <PlusSquareOutlined
                style={{ color: "green" }}
                onClick={() => addNewRow(record)}
              />
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => deleteRow(record)}
              />
            </div>
          ) : (
            <PlusSquareOutlined
              className="d-flex justify-content-center"
              style={{ color: "green" }}
              onClick={() => addNewRow(record)}
            />
          )}
        </>
      ),
    },
    {
      title: "Process",
      width: 200,
      editable: true,

      render: (text, record) => {
        return (
          <div>
            <Form.Item
              name={`BioHazardProcessId ${record.key}`}
              label="Process"
              className="d-flex flex-column"
              rules={
                [
                  // {
                  //   required: true,
                  //   message: "Required",
                  // },
                ]
              }
            >
              <Select
                placeholder="Select ..."
                optionFilterProp="children"
                className="text-start w-100"
              >
                {process?.map((item) => {
                  return (
                    <Option
                      value={item.BioHazardProcessId}
                      label={item.ProcessTitle}
                      key={item.BioHazardProcessId}
                    >
                      {item.ProcessTitle}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Min Value",
      dataIndex: "MinValue",
      width: 200,
      render: (data, record) => {
        return (
          <div>
            <Form.Item
              name={`MinValue ${record.key}`}
              rules={[
                {
                  pattern: /^[0-9.]*$/,
                  message: "Please enter thae value between 160 to 180",
                },
                () => ({
                  validator(_, value) {
                    if (!value || (value >= 160 && value <= 180)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Min 160 and Max 180");
                    }
                  },
                }),
              ]}
            >
              <div className="row">
                <Input
                  placeholder="Min Value"
                  onChange={(e) =>
                    setDataSource(
                      dataSource.map((item) => {
                        if (item.key === record.key) {
                          item.MinValue = Number(e.target.value);
                          return item;
                        } else {
                          return item;
                        }
                      })
                    )
                  }
                  className="col-8"
                />
                <span className="col-4">
                  <sup>O</sup>F
                </span>
              </div>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Max Value",
      dataIndex: "MaxValue",
      width: 200,
      render: (data, record) => {
        return (
          <div>
            <Form.Item
              name={`MaxValue ${record.key}`}
              rules={[
                {
                  pattern: /^[0-9.]*$/,
                  message: "Only Number value",
                },
                () => ({
                  validator(_, value) {
                    if (!value || (value >= 160 && value <= 180)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Min 160 and Max 180");
                    }
                  },
                }),
              ]}
            >
              <div className="row">
                <Input
                  placeholder="Max Value"
                  className="col-8"
                  onChange={(e) =>
                    setDataSource(
                      dataSource.map((item) => {
                        if (item.key === record.key) {
                          item.MaxValue = Number(e.target.value);
                          return item;
                        } else {
                          return item;
                        }
                      })
                    )
                  }
                />
                <span className="col-4">
                  <sup>O</sup>F
                </span>
              </div>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      width: 200,
      render: (data, record) => {
        return (
          <div>
            <Form.Item
              name={`Duration ${record.key}`}
              rules={[
                {
                  pattern: /^[0-9.]*$/,
                  message: "Please enter duration",
                },
              ]}
            >
              <Input
                placeholder="Duration"
                onChange={(e) =>
                  setDataSource(
                    dataSource.map((item) => {
                      if (item.key === record.key) {
                        item.Duration = Number(e.target.value);
                        return item;
                      } else {
                        return item;
                      }
                    })
                  )
                }
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Is Exists",
      dataIndex: "IsExists",
      width: 200,
      render: (text, record) => {
        return (
          <Form.Item
            name={`IsExists ${record.key}`}
            valuePropName="checked"
            // rules={[
            //   () => ({
            //     validator(_, value) {
            //       if (value) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Is exists not checked");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Checkbox
              onChange={(e) =>
                setDataSource(
                  dataSource.map((item) => {
                    if (item.key === record.key) {
                      console.log(e.target.value);
                      item.IsExists = e.target.checked;
                      return item;
                    } else {
                      return item;
                    }
                  })
                )
              }
            >
              Is Exists
            </Checkbox>
          </Form.Item>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: 200,
      render: (data, record) => {
        return (
          <Form.Item
            name={`Status ${record.key}`}
            className="btn"
            valuePropName="checked"
            // rules={[
            //   () => ({
            //     validator(_, value) {
            //       if (value) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Status not checked");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Checkbox
              onChange={(e) =>
                setDataSource(
                  dataSource.map((item) => {
                    if (item.key === record.key) {
                      item.Status = e.target.checked;
                      return item;
                    } else {
                      return item;
                    }
                  })
                )
              }
            >
              Status
            </Checkbox>
          </Form.Item>
        );
      },
    },
    {
      title: "Actions",
      width: 150,
      fixed: "right",
      render: (data, record) => {
        return (
          <Form.Item name={`Submit ${record.key}`}>
            <button
              type="link"
              onClick={() => handleSubmitForm(record)}
              className="btn btn-primary w-100 p-0"
            >
              Analyze
            </button>
          </Form.Item>
        );
      },
    },
  ];

  const handleSubmitForm = (val) => {
    dataSource.map((item) => {
      if (item.key === val.key) {
        if (
          !isEmpty(val.MinValue) &&
          !isEmpty(val.MaxValue) &&
          !isEmpty(val.Duration) &&
          !isEmpty(val.IsExists) &&
          !isEmpty(val.Status) &&
          !isEmpty(val.BioHazardProcessId)
        ) {
          alert("Validated");
        } else {
          alert("Not Valid");
        }
      }
    });
  };

  const deleteRow = (deletedRecord) => {
    setDataSource((data) => {
      console.log(data, deletedRecord);
      return data.filter((records) => records.key !== deletedRecord.key);
    });
  };

  const addNewRow = (data) => {
    setNewAddedRow(!addedRow);
    const dataIndex = dataSource.findIndex((item) => item?.key === data.key);
    const newData = {
      key: `${data.key}.${count}`,
      new: true,
      Process: "",
      MinValue: "",
      MaxValue: "",
      Duration: "",
      IsExists: "",
      Status: "",
    };

    dataSource.splice(dataIndex + 1, 0, newData);
    setDataSource([...dataSource]);
    setCount(count + 1);
  };

  return (
    <div className="container">
      <h1 className="text-center m-4">Task to create table</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitForm}
        autoComplete="off"
      >
        <Table
          bordered
          columns={defaultColumns}
          dataSource={dataSource}
          pagination={false}
          scroll={{
            x: 240,
          }}
        />
      </Form>
    </div>
  );
};

export default TableComponent;
