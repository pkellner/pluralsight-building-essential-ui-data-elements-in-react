import { useEffect, useState } from "react";

function useGeneralizedCrudMethods(initialData, delayMs = 1000) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      try {
        setData(initialData);
      } catch (e) {
        setError(e);
      }
    }
    getData();
  }, [initialData, delayMs]);

  function createRecord(createObject) {
    async function addData() {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      setData(function (oriState) {
        return [...oriState, createObject];
      });
    }
    addData();
  }
  function updateRecord(id, updateObject) {
    async function updateData() {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      setData(function (oriState) {
        const dataRecord = oriState.find((rec) => rec.id === id);
        for (const [key, value] of Object.entries(updateObject)) {
          debugger;
          dataRecord[key] = value === undefined ? undefined : value;
        }
        return oriState.map((rec) => (rec.id === id ? dataRecord : rec));
      });
    }
    updateData();
  }
  function deleteRecord(id) {
    async function deleteData() {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      setData(function (oriState) {
        return oriState.filter((rec) => rec.id != id);
      });
    }
    deleteData();
  }

  return {
    data,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}

export default useGeneralizedCrudMethods;
