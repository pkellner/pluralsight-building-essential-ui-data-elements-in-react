import { useEffect, useState } from "react";
import axios from "axios";
const DELAYMS = 1000;

function useGeneralizedCrudMethods(url, errorNotificationFn) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [validateDate, setValidateDate] = useState(new Date());

  if (!url || url.length === 0) {
    throw "useGeneralizedCrudMethods must be passed url";
  }

  function validate() {
    setValidateDate(new Date());
  }

  function formatErrorMessage(e, url) {
    const errorString =
      e.response.status === 404
        ? e.message + " url: " + url
        : `${e?.message} ${e?.response?.data}`;
    console.log(errorString);
    return errorString;
  }

  useEffect(() => {
    async function getData() {
      try {
        const results = await axios.get(url);
        await new Promise((resolve) => setTimeout(resolve, DELAYMS));
        setData(results.data);
      } catch (e) {
        setError(e);
      }
    }
    getData();
  }, [url, validateDate]);

  async function createRecord(createObject) {
    async function addData() {
      const startingData = [...data];
      try {
        setData(function (oriState) {
          return [...oriState, createObject];
        });
        await new Promise((resolve) => setTimeout(resolve, DELAYMS));
        //url += "-BreakURL";
        await axios.post(url, createObject);
      } catch (e) {
        setData(startingData);
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    addData();
  }

  async function updateRecord(id, updateObject) {
    async function updateData() {
      const startingData = [...data];
      try {
        setData(function (oriState) {
          const dataRecord = oriState.find((rec) => rec.id === id);
          for (const [key, value] of Object.entries(updateObject)) {
            dataRecord[key] = value === undefined ? dataRecord[key] : value;
          }
          return oriState.map((rec) => (rec.id === id ? dataRecord : rec));
        });
        await new Promise((resolve) => setTimeout(resolve, DELAYMS));
        //url += "-BreakURL";
        await axios.put(`${url}/${id}`, {
          // to make fail, at x to url string
          ...updateObject,
        });
      } catch (e) {
        setData(startingData);
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    updateData();
  }
  async function deleteRecord(id) {
    async function deleteData() {
      const startingData = [...data];
      try {
        setData(function (oriState) {
          return oriState.filter((rec) => rec.id != id);
        });
        await new Promise((resolve) => setTimeout(resolve, DELAYMS));
        //url += "-BreakURL";
        await axios.delete(`${url}/${id}`);
      } catch (e) {
        setData(startingData);
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
