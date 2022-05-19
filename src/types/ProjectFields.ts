export type ProjectFieldsQueryResult = {
  data?: Data;
};

interface Data {
  node?: DataNode;
}

interface DataNode {
  fields?: Fields;
}

interface Fields {
  nodes?: NodeElement[];
}

interface NodeElement {
  id?: string;
  name?: string;
  settings?: string;
}
