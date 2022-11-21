import { pool } from "../db.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bcryptjs = require('bcryptjs');

// TABLE USERS

//funcion que me devuelva si el usuario esta en la tabla de users y y me traiga el valor de perfil

export const getUserProfile = async (req, res) => {
  try {
    const { persCodi } = req.params;
    const [result] = await pool.query("SELECT USER_PERF FROM users WHERE USER_CODI = ? ",
    [ persCodi ]);
    res.json({ result: result[0].USER_PERF });
  } catch (error) {
    return res.status(500).json({ result: "" });
  }
};

export const userRegister = async (req, res) => {
  try {
    const { user_codi, user_lega, user_perf, user_pass } = req.body;
    let user_pass_encrypt = await bcryptjs.hash(user_pass, 8);
    const [result] = await pool.query(
      "INSERT INTO users SET USER_CODI = ?, USER_LEGA = ?,	USER_PERF = ?,	USER_PASS = ? ",
      [ user_codi, user_lega, user_perf, user_pass_encrypt ]
    );
    // result = 1 Registracion correcta
    return res.json({ result : result.affectedRows });
  } catch (error) {
    // result = 2 Usuario ya registrado
    return res.status(500).json({ result: 2 });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { user_lega, user_pass } = req.body;
    let user_pass_encrypt = await bcryptjs.hash(user_pass, 8);
    const [result] = await pool.query(
      "SELECT * FROM users WHERE USER_LEGA = ?",
      [ user_lega ]
    );
    if(result.length==0){
      return res.json({ result : "NOT_FOUND" });
    }else if (await bcryptjs.compare(user_pass,result[0].USER_PASS)) {
      return res.json({ result : "CORRECT_LOGIN" });
    }else {
      return res.json({ result : "INCORRECT_LOGIN" });
    }
  } catch (error) {
    return res.status(500).json({ result: error.code });
  }
};

// TABLE LAST_SESSION

export const setLastSession = async (req, res) => {
  try {
    const { last_cper, last_ccli,	last_cobj,	last_fech,	last_dhor,	last_hhor,	last_usua,	last_pues,	last_npue, last_esta,	last_ncli,	last_nobj,	last_dhre, last_time } = req.body;
    const [result] = await pool.query(
      "INSERT INTO last_session (LAST_CPER, LAST_CCLI,	LAST_COBJ,	LAST_FECH,	LAST_DHOR,	LAST_HHOR,	LAST_USUA,	LAST_PUES,	LAST_NPUE, LAST_ESTA, LAST_NCLI, LAST_NOBJ, LAST_DHRE, LAST_TIME ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE LAST_CCLI=VALUES(last_ccli),	LAST_COBJ=VALUES(last_cobj),	LAST_FECH=VALUES(last_fech),	LAST_DHOR=VALUES(last_dhor),	LAST_HHOR=VALUES(last_hhor),	LAST_USUA=VALUES(last_usua),	LAST_PUES=VALUES(last_pues),	LAST_NPUE =VALUES(last_npue ),	LAST_ESTA =VALUES(last_esta),	LAST_NCLI =VALUES(last_ncli),	LAST_NOBJ =VALUES(last_nobj),	LAST_DHRE=VALUES(last_dhre), LAST_TIME=VALUES(last_time)",
      [ last_cper, last_ccli,	last_cobj, last_fech,	last_dhor,	last_hhor,	last_usua,	last_pues,	last_npue, last_esta,	last_ncli,	last_nobj,	last_dhre, last_time ]
    );
    return res.json({ result : result.affectedRows });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong"+error });
  }
};

export const getLastSession = async (req, res) => {
  try {
    const { persCodi } = req.params;
    const [rows] = await pool.query("SELECT * FROM last_session WHERE LAST_CPER = ? ",
    [ persCodi ]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const closeLastSession = async (req, res) => {
  try {
    const { persCodi } = req.params;
    const [result] = await pool.query("UPDATE last_session SET LAST_ESTA = 0 WHERE LAST_CPER = ?",
    [ persCodi ]);
    if (result.affectedRows === 0){
      return res.status(404).json({ message: "Personal no econtrado" });
    }else{
      res.status(201).json({ message: "Estado cerrado correctamente" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error });
  }
};

// TABLE ASIGVIGI

export const setHoraEgresoVigilador = async (req, res) => {
  try {
    const { codPuesto, codVigi, timestamp } = req.params;
    const { horaEgreso } = req.body
    const [result] = await pool.query("UPDATE asigvigi SET ASIG_HHOR = ? WHERE ASIG_PUES = ? AND ASIG_VIGI = ? AND ASIG_TIME = ?",
    [ horaEgreso, codPuesto, codVigi, timestamp ]);
    if (result.affectedRows === 0){
      return res.status(404).json({ result: 0 });
    }else{
      res.status(201).json({ result: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error });
  }
};

export const addPuestoVigilador = async (req, res) => {
  try {
    const { asig_obje,	asig_vigi,	asig_fech,	asig_dhor,	asig_hhor,	asig_ause,	asig_deta,	asig_visa,	asig_obse,	asig_usua,	asig_time,	asig_fact,	asig_pues,	asig_bloq,	asig_esta,	asig_facm } = req.body;
    const [result] = await pool.query(
      "INSERT INTO asigvigi (ASIG_OBJE,	ASIG_VIGI,	ASIG_FECH,	ASIG_DHOR,	ASIG_HHOR,	ASIG_AUSE,	ASIG_DETA,	ASIG_VISA,	ASIG_OBSE,	ASIG_USUA,	ASIG_TIME,	ASIG_FACT,	ASIG_PUES,	ASIG_BLOQ,	ASIG_ESTA,	ASIG_FACM ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [ asig_obje,	asig_vigi,	asig_fech,	asig_dhor,	asig_hhor,	asig_ause,	asig_deta,	asig_visa,	asig_obse,	asig_usua,	asig_time,	asig_fact,	asig_pues,	asig_bloq,	asig_esta,	asig_facm ]
    );
    return res.json({ result : result.affectedRows });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong"+error });
  }
};


// TABLE PERSONAL

export const getPersonal = async (req, res) => {
  try {
    const { nroLegajo } = req.params;
    const [rows] = await pool.query("SELECT PERS_CODI, TRIM(PERS_NOMB) AS PERS_NOMB, PERS_NDOC, PERS_FNAC, PERS_SECT, PERS_FEGR FROM personal WHERE PERS_EMPR=1 AND PERS_LEGA = ? ",
    [ nroLegajo ]);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// TABLE OBJETIVOS (CLIENTES)

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT OBJE_CODI, TRIM(OBJE_NOMB) AS OBJE_NOMB FROM objetivo WHERE OBJE_EMPR=1 AND OBJE_BAJA IS NULL ORDER BY OBJE_NOMB ASC");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getCliente = async (req, res) => {
  try {
    const { nombreCliente } = req.params;
    const [rows] = await pool.query("SELECT OBJE_CODI, TRIM(OBJE_NOMB) AS OBJE_NOMB FROM objetivo WHERE OBJE_EMPR=1 AND OBJE_BAJA IS NULL AND OBJE_NOMB=?",
    [ nombreCliente ]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// TABLE PUESGRUP (OBJETIVOS)

export const getAllObjetivos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT GRUP_CODI, TRIM(GRUP_NOMB) AS GRUP_NOMB FROM puestos, puesgrup WHERE PUES_GRUP=GRUP_CODI AND OBJE_BAJA IS NULL");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getObjetivos = async (req, res) => {
  try {
    const { idCliente } = req.params;
    const [rows] = await pool.query("SELECT DISTINCT GRUP_CODI, TRIM(GRUP_NOMB) AS GRUP_NOMB FROM puestos, puesgrup WHERE PUES_GRUP=GRUP_CODI AND PUES_OBJE = ? AND OBJE_BAJA IS NULL AND PUES_TIPO != 3",
    [ idCliente ]);
    res.json(rows);

  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// TABLE DEVICES

export const getDevice = async (req, res) => {
  try {
    const { androidID } = req.params;
    const [rows] = await pool.query("SELECT * FROM devices WHERE DEVI_ANID = ?",
    [ androidID ]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ result: 1 });
  }
};

export const addDevice = async (req, res) => {
  try {
    const { devi_anid,	devi_date,	devi_esta,	devi_ccli,	devi_cobj,	devi_marc,	devi_mode, devi_ncli,	devi_nobj } = req.body;
    const [result] = await pool.query(
      "INSERT INTO devices VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [ devi_anid,	devi_date,	devi_esta,	devi_ccli,	devi_cobj,	devi_marc,	devi_mode, devi_ncli,	devi_nobj ]
    );
    res.json({ result: 0 } );
  } catch (error) {
    res.json({ result: 1 });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM devices");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { androidID } = req.params;
    const [result] = await pool.query("DELETE FROM devices WHERE DEVI_ANID = ?",
    [ androidID ]);
    if (result.affectedRows === 0){
      res.status(404).json({ result: 0 }); // Android ID no econtrado
    }else{
      res.status(201).json({ result: 1}); // Dispositivo Eliminado
    }
  } catch (error) {
    res.status(500).json({ result: 2 }); // Error en el Servidor
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { androidID } = req.params;
    const { devi_anid,	devi_date,	devi_esta,	devi_ccli,	devi_cobj,	devi_marc,	devi_mode, devi_ncli,	devi_nobj } = req.body;
    const [result] = await pool.query("UPDATE devices SET DEVI_ANID=?, DEVI_DATE=?, DEVI_ESTA=?, DEVI_CCLI=?, DEVI_COBJ=?, DEVI_MARC=?, DEVI_MODE=?,	DEVI_NCLI=?,	DEVI_NOBJ=? WHERE DEVI_ANID = ?",
    [ devi_anid,	devi_date,	devi_esta,	devi_ccli,	devi_cobj,	devi_marc,	devi_mode, devi_ncli,	devi_nobj, androidID ]
    );
    if (result.affectedRows === 0){
      res.status(404).json({ result: 0 }); // Android ID no econtrado
    }else{
      res.status(201).json({ result: 1}); // Dispositivo Actualizado
    }
  } catch (error) {
    res.status(500).json({ result: 2 }); // Error en el Servidor
  }
};

// TABLE NOTIFICATION

export const getCounter = async (req, res) => {
  try {
    const { nameCounter } = req.params;
    const [result] = await pool.query("SELECT counter FROM notification WHERE name = ? ",
    [ nameCounter ]);
    return res.status(201).json({ result: result[0].counter });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const incrementCounter = async (req, res) => {
  try {
    const { nameCounter } = req.params;
    const [result] = await pool.query("UPDATE notification SET counter = counter + 1 WHERE name = ?",
    [ nameCounter ]);
    if (result.affectedRows === 0){
      return res.status(404).json({ message: "Counter no econtrado" });
    }else{
      res.status(201).json({ message: "Notificacion incrementada correctamente" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong: " + error });
  }
};

export const decrementCounter = async (req, res) => {
  try {
    const { nameCounter } = req.params;
    const [result] = await pool.query("UPDATE notification SET counter = counter - 1 WHERE name = ?",
    [ nameCounter ]);
    if (result.affectedRows === 0){
      return res.status(404).json({ message: "Counter no econtrado" });
    }else{
      res.status(201).json({ message: "Notificacion decrementada correctamente" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error });
  }
};

// TABLE REQUEST DEVICES

export const getRequestDevices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM request_device");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const countPending = async (req, res) => {
  try {
    const { nameCounter } = req.params;
    const [result] = await pool.query("SELECT COUNT(*) AS counter FROM request_device WHERE RDEV_ESTA = 'pending' ");
    return res.status(201).json({ counter: result[0].counter });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const addRequestDevice = async (req, res) => {
  try {
    const { rdev_anid,	rdev_date,	rdev_esta,	rdev_ccli,	rdev_cobj,	rdev_marc,	rdev_mode,	rdev_nomb,	rdev_ncli,	rdev_nobj,	rdev_cper } = req.body;
    const [result] = await pool.query(
      "INSERT INTO request_device (RDEV_ANID, RDEV_DATE, RDEV_ESTA, RDEV_CCLI, RDEV_COBJ, RDEV_MARC, RDEV_MODE,	RDEV_NOMB,	RDEV_NCLI,	RDEV_NOBJ,	RDEV_CPER) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE RDEV_DATE=VALUES(rdev_date), RDEV_ESTA=VALUES(rdev_esta), RDEV_CCLI=VALUES(rdev_ccli), RDEV_COBJ=VALUES(rdev_cobj), RDEV_MARC=VALUES(rdev_marc), RDEV_MODE=VALUES(rdev_mode),	RDEV_NOMB=VALUES(rdev_nomb),	RDEV_NCLI=VALUES(rdev_ncli),	RDEV_NOBJ=VALUES(rdev_nobj),	RDEV_CPER=VALUES(rdev_cper)",
      [ rdev_anid,	rdev_date,	rdev_esta,	rdev_ccli,	rdev_cobj,	rdev_marc,	rdev_mode,	rdev_nomb,	rdev_ncli,	rdev_nobj,	rdev_cper ]
    );
    return res.json({ result : result.affectedRows });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong"+error });
  }
};

export const statusAdded = async (req, res) => {
  try {
    const { androidID } = req.params;
    const [result] = await pool.query("UPDATE request_device SET RDEV_ESTA = 'added' WHERE RDEV_ANID = ?",
    [ androidID ]);
    if (result.affectedRows === 0){
      return res.status(404).json({ message: "androidID no econtrado" });
    }else{
      res.status(201).json({ message: "Estado de solicitud cambiada" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" + error });
  }
};

export const deleteRequestDevice = async (req, res) => {
  try {
    const { androidID } = req.params;
    const [result] = await pool.query("DELETE FROM request_device WHERE RDEV_ANID = ?",
    [ androidID ]);
    if (result.affectedRows === 0){
      return res.status(404).json({ result: 0 }); //androidID no econtrado
    }else{
      res.status(201).json({ result: 1}); //Estado de solicitud cambiada
    }
  } catch (error) {
    return res.status(500).json({ result: 2 }); //Error en el Servidor
  }
};

export const deleteAllRequestDevice = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM request_device");
    res.status(201).json({ result: 1}); // Todas las solicitudes eliminadas
  } catch (error) {
    res.status(500).json({ result: 2 }); //Error en el Servidor
  }
};

// TABLE PUESTOS

export const getPuestos = async (req, res) => {
  try {
    const { idCliente, idObjetivo } = req.params;
    const [rows] = await pool.query("SELECT * FROM puestos WHERE PUES_OBJE = ? AND PUES_GRUP = ? AND PUES_TIPO != 3",
    [ idCliente, idObjetivo ]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
