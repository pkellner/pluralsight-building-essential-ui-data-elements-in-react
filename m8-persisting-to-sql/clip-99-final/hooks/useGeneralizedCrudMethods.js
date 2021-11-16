import { useEffect, useState } from "react";
import axios from "axios";

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
        setData(results.data);
      } catch (e) {
        setError(e);
      }
    }
    getData();
  }, [url,validateDate]);

  async function createRecord(createObject) {
    async function addData() {
      try {
        setData(function (oriState) {
          return [...oriState, createObject];
        });
        //await axios.post(url + 'x', createObject); // causes error for testing
        await axios.post(url, createObject);
      } catch (e) {
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    addData();
  }

  async function updateRecord(id, updateObject) {
    async function updateData() {
      try {
        setData(function (oriState) {
          const dataRecord = oriState.find((rec) => rec.id === id);
          for (const [key, value] of Object.entries(updateObject)) {
            dataRecord[key] = value === undefined ? dataRecord[key] : value;
          }
          return oriState.map((rec) => (rec.id === id ? dataRecord : rec));
        });
        await axios.put(`${url}/${id}`, {
          // to make fail, at x to url string
          ...updateObject,
        });
      } catch (e) {
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    updateData();
  }
  async function deleteRecord(id) {
    async function deleteData() {
      try {
        await axios.delete(`${url}/${id}`);
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
