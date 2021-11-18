import { useEffect, useState } from "react";
import axios from "axios";

function useGeneralizedCrudMethods(url, errorNotificationFn) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [validateDate, setValidateDate] = useState(new Date());

  if (!url || url.length === 0) {
    throw "useGeneralizedCrudMethods must be passed url";
  }

  useEffect(() => {
    async function getData() {
      try {
        const results = await axios.get(url);
        setData(results.data);
      } catch (e) {
        setError(e);
      }
    }
    getData();
  }, [url, validateDate]);

  function createRecord(createObject) {
    async function addData() {
      try {
        await axios.post(url, createObject); //url += "-BreakURL";
        setData(function (oriState) {
          return [...oriState, createObject];
        });
      } catch (e) {
        setData(startingData);
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    addData();
  }
  function updateRecord(id, updateObject) {
    async function updateData() {
      try {
        await axios.put(`${url}/${id}`, {
          // to make fail, at x to url string
          ...updateObject,
        });
        setData(function (oriState) {
          const dataRecord = oriState.find((rec) => rec.id === id);
          for (const [key, value] of Object.entries(updateObject)) {
            dataRecord[key] = value === undefined ? dataRecord[key] : value;
          }
          return oriState.map((rec) => (rec.id === id ? dataRecord : rec));
        });
      } catch (e) {
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    updateData();
  }
  function deleteRecord(id) {
    async function deleteData() {
      try {
        await axios.delete(`${url}/${id}`);
        await new Promise((resolve) => setTimeout(resolve, DELAYMS));
        setData(function (oriState) {
          return oriState.filter((rec) => rec.id != id);
        });
      } catch (e) {
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
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
