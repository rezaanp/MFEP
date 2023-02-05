import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormEditKriteria = ({ goBack }) => {
  const [data, setData] = useState({
    code: "",
    name: "",
    weight: "",
    message: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://localhost:5000/criteria/${id}`);
      setData({
        code: response?.data?.code,
        name: response?.data?.name,
        weight: response?.data?.weight,
      });
    };
    getData();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/criteria/${id}`, {
        code: data.code,
        name: data.name,
        weight: data.weight,
      });
      goBack();
    } catch (error) {
      setData({ ...data, message: error?.response?.data?.msg });
    }
  };

  return (
    <div className="overflow-auto h-full">
      <div className={styles.inputWrap}>
        <label htmlFor="kode" className={styles.inputLabel}>
          Kode
        </label>
        <input
          type="text"
          id="kode"
          autoComplete="off"
          placeholder="Masukan Kode Kriteria"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, code: e.target.value })}
          value={data?.code && data?.code}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="name" className={styles.inputLabel}>
          Nama Kriteria
        </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          placeholder="Masukan Nama Kriteria"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data?.name && data?.name}
        />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="bobot" className={styles.inputLabel}>
          Bobot
        </label>
        <input
          type="text"
          id="bobot"
          autoComplete="off"
          placeholder="Masukan Bobot Kriteria"
          className={styles.inputValue}
          onChange={(e) => setData({ ...data, weight: e.target.value })}
          value={data?.weight && data?.weight}
        />
      </div>

      <div className={styles.inputButtonWrap}>
        <button onClick={goBack} className={styles.buttonCancel}>
          Batal
        </button>
        <button onClick={updateData} className={styles.buttonUpdate}>
          Perbarui
        </button>
      </div>
      {data.message ? (
        <h1 className="px-3 lg:px-10 font-bold text-red-500">{data.message}</h1>
      ) : null}
    </div>
  );
};

const styles = {
  inputWrap: "flex flex-col px-3 lg:px-10 mt-8",
  inputLabel: "select-none mb-4",
  inputValue:
    "rounded-xl h-11 focus:ring-sky-400 ring-4 focus:outline-none px-4 bg-white ring-slate-300",
  inputButtonWrap:
    "flex items-center gap-3 justify-end mt-14 px-3 lg:px-10 mb-10",
  buttonCancel:
    "bg-white hover:border-sky-300 border-sky-500 border-2 py-2 px-4 rounded-md cursor-pointer",
  buttonUpdate:
    "bg-green-500 hover:bg-green-400 py-2 px-4 rounded-md text-white cursor-pointer",
};

export default FormEditKriteria;
