import { useEffect, useState } from "react";
import { DELAYMS } from "./useNotes";
import axios from "axios";

export function useGeneralizedCrudMethods(
  initialData,
  url,
  errorNotificationFn
) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [validateDate, setValidateDate] = useState(new Date());

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
    async function getData(url) {
      try {
        if (url) {
          const results = await axios.get(url); // timeout inside REST
          setData(results.data);
        } else {
          await new Promise((resolve) => setTimeout(resolve, DELAYMS));
          setData(initialData);
        }
      } catch (e) {
        setError(formatErrorMessage(e, url));
      }
    }
    getData(url);
  }, [validateDate]);

  function createRecord(createObject) {
    async function addData() {
      try {
        if (url) {
          setData(function (oriState) {
            return [...oriState, createObject];
          });
          //await axios.post(url + 'x', createObject); // timeout inside REST
          await axios.post(url, createObject); // timeout inside REST
        } else {
          setData(function (oriState) {
            return [...oriState, createObject];
          });
          await new Promise((resolve) => setTimeout(resolve, DELAYMS));
          // throw { message: "createRecord error", response: { data: "" } };
        }
      } catch (e) {
        const errorString = formatErrorMessage(e, url);
        errorNotificationFn?.(errorString);
        validate();
      }
    }
    addData();
  }

  function updateRecord(id, updateObject) {
    function updateRecordSetData() {
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

    async function updateData() {
      try {
        if (url) {
          updateRecordSetData();
          await axios.put(`${url}/${id}`, {
            // to make fail, at x to url string
            ...updateObject,
          });
        } else {
          updateRecordSetData();
          await new Promise((resolve) => setTimeout(resolve, DELAYMS));
          //throw { message: "updateRecord error", response: { data: "" } };
        }
      } catch (e) {
        errorNotificationFn?.(formatErrorMessage(e, url));
        validate();
      }
    }
    updateData();
  }

  function deleteRecord(id) {
    function deleteRecordSetData() {
      setData(function (oriState) {
        return oriState.filter(function (rec) {
          return rec.id != id;
        });
      });
    }

    async function deleteData() {
      try {
        if (url) {
          deleteRecordSetData();
          await axios.delete(`${url}/${id}`);
        } else {
          deleteRecordSetData();
          await new Promise((resolve) => setTimeout(resolve, DELAYMS));
          //throw { message: "deleteRecord error", response: { data: "" } };
        }
      } catch (e) {
        errorNotificationFn?.(formatErrorMessage(e, url));
        validate();
      }
    }
    deleteData();
  }

  return { data, error, createRecord, updateRecord, deleteRecord };
}
