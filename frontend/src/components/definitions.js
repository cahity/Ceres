export const operationBlocks = [
  {
    id: "CsvCreatorOP",
    title: "My Operation Block",
    description: "Empty description.",
    parameters: [
      {
        id: "file_name",
        options: [
          {
            id: "0",
            text: "CsvCreatorOP-file_name-o0",
          },
          {
            id: "1",
            text: "CsvCreatorOP-file_name-o1",
          },
          {
            id: "2",
            text: "CsvCreatorOP-file_name-o2",
          },
        ],
      },
      {
        id: "object_name",
        options: [
          {
            id: "0",
            text: "CsvCreatorOP-object_name-o0",
          },
          {
            id: "1",
            text: "CsvCreatorOP-object_name-o1",
          },
        ],
      },
    ],
    checkboxParameters: [],
    textboxParameters: [],
  },
  {
    id: "UnknownOP",
    title: "My Unknown Block",
    description: "Other empty description.",
    parameters: [
      {
        id: "unknown_parameter_0",
        type: "dropdown",
        options: [
          {
            id: "0",
            text: "UnknownOP-unknown_parameter_0-o0",
          },
          {
            id: "1",
            text: "UnknownOP-unknown_parameter_0-o1",
          },
          {
            id: "2",
            text: "UnknownOP-unknown_parameter_0-o2",
          },
        ],
      },
    ],
    checkboxParameters: [
      {
        guid: "UnknownOP_checkbox_0",
        text: "checkbox_test_0",
      },
      {
        guid: "UnknownOP_checkbox_1",
        text: "checkbox_test_1",
      },
    ],
    textboxParameters: [
      {
        guid: "UnknownOP_textbox_0",
        text: "textbox_test_0",
      },
    ],
  },
];

// TODO: use more guids
