import { useEffect, useState } from "react";
import { DELAYMS } from "./useNotes";

export function useGeneralizedCrudMethods(initialData) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      await new Promise((resolve) => setTimeout(resolve, DELAYMS));
      try {
        //throw "error"
        setData(initialData);
      } catch (e) {
        setError(e);
      }
    }
    getData();
  }, [initialData]);

  function createRecord(createObject) {
    async function addData() {
      await new Promise((resolve) => setTimeout(resolve, DELAYMS));
      setData(function (oriState) {
        return [...oriState, createObject];
      });
    }
    addData();
  }

  function updateRecord(id, updateObject) {
    async function updateData() {
      await new Promise((resolve) => setTimeout(resolve, DELAYMS));
      setData(function (oriState) {
        // find the individual record and only update the fields passed in, not all of them
        const dataRecord = oriState.find((rec) => rec.id === id);
        for (const [key, value] of Object.entries(updateObject)) {
          //console.log(`useGeneralizedCrudMethods: udpateRecordGeneralized:  key: ${key}   value:${value}`);
          dataRecord[key] = value;
        }
        // replace just the record updated leaving the others the same
        return oriState.map(function (rec) {
          return rec.id === id ? dataRecord : rec;
        });
      });
    }
    updateData();
  }

  function deleteRecord(id) {
    async function deleteData() {
      await new Promise((resolve) => setTimeout(resolve, DELAYMS));
      setData(function (oriState) {
        return oriState.filter(function (rec) {
          return rec.id != id;
        });
      });
    }
    deleteData();
  }

  return { data, error, createRecord, updateRecord, deleteRecord };
}
