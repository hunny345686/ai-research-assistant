type Doc = {
  text: string;
  embedding: number[];
};

const store: Doc[] = [];

export function addDoc(doc: Doc) {
  store.push(doc);
}

export function getAllDocs() {
  return store;
}
