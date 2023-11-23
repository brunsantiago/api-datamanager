//import { Router } from "express";
const Router = require("express").Router;

// import {
//   getUserProfile,
//   userRegister,
//   userLogin,
//   setLastSession,
//   getLastSession,
//   closeLastSession,
//   setHoraEgresoVigilador,
//   addPuestoVigilador,
//   getPersonal,
//   getClientes,
//   getCliente,
//   getAllObjetivos,
//   getObjetivos,
//   requestCoordinate,
//   getCounter,
//   incrementCounter,
//   decrementCounter,
//   getDevice,
//   addDevice,
//   getAllDevices,
//   deleteDevice,
//   updateDevice,
//   addRequestDevice,
//   getRequestDevices,
//   countPending,
//   statusAdded,
//   deleteRequestDevice,
//   deleteAllRequestDevice,
//   getPuestos
// } from "../controllers/employees.controller.js";

const {
  getUserProfile,
  userRegister,
  userLogin,
  userRecoveryKey,
  setLastSession,
  getLastSession,
  closeLastSession,
  setHoraEgresoVigilador,
  addPuestoVigilador,
  getPersonal,
  getClientes,
  getCliente,
  getAllObjetivos,
  getObjetivos,
  requestCoordinate,
  getCounter,
  incrementCounter,
  decrementCounter,
  getDevice,
  addDevice,
  getAllDevices,
  deleteDevice,
  updateDevice,
  addRequestDevice,
  getRequestDevices,
  countPending,
  statusAdded,
  deleteRequestDevice,
  deleteAllRequestDevice,
  getPuestos
  } = require("../controllers/employees.controller.js");



const router = Router();

// TABLE USERS

// GET Obtener perfil de usuario
router.get("/users/:persCodi", getUserProfile);

//POST Registro de usuario
router.post("/register", userRegister);

//POST Login de usuario
router.post("/login", userLogin);

//PATCH User Key
router.patch("/recovery_key/:persCodi", userRecoveryKey);


// TABLE LAST SESION

// POST Cargar Ultima Sesion
router.post("/last_session", setLastSession);

// GET Cargar Ultima Sesion
router.get("/last_session/:persCodi", getLastSession);

// PATCH Cerrar Ultima Sesion
router.patch("/last_session/:persCodi", closeLastSession);


// TABLE ASIGVIGI

// PATCH Cargar Hora Egreso Vigilador
router.patch("/asigvigi/:asigId", setHoraEgresoVigilador)

// POST Cargar Hora Ingreso Vigilador
router.post("/asigvigi", addPuestoVigilador);

// TABLE PERSONAL

// GET Personal (SAB-5) Ver si se filtra por ACTIVO
router.get("/personal/:nroLegajo", getPersonal);


// TABLE OBJETIVO (CLIENTES)

// GET all Clientes (Activos - SAB-5)
router.get("/clientes", getClientes);

// GET Cliente (Activo - SAB-5)
router.get("/clientes/:nombreCliente", getCliente);

// TABLE PUESGRUP (OBJETIVOS)

// GET all Objetivos
router.get("/objetivos", getAllObjetivos);

// GET Objetivos from Cliente
router.get("/objetivos/:idCliente", getObjetivos)

// GET Coordinadas from Objetivo
router.get("/objetivos/coordinate/:idObjetivo", requestCoordinate)


// TABLE DEVICE

//GET Device
router.get("/devices/:androidID", getDevice);

//INSERT Device
router.post("/devices", addDevice);

//GET All Devices
router.get("/devices", getAllDevices);

//DELETE Device
router.delete("/devices/:androidID", deleteDevice );

//UPDATE Device
router.put("/devices", updateDevice );


// TABLE REQUEST DEVICE

// INSERT Request Device
router.post("/request_device", addRequestDevice);

//GET All Request Devices
router.get("/request_device", getRequestDevices);

//GET All Request Devices Pending
router.get("/request_device/count_pending", countPending);

//PATCH Request Devices Change Status
router.patch("/request_device/:androidID", statusAdded );

//DELETE Request Devices
router.delete("/request_device/:androidID", deleteRequestDevice );

//DELETE Request Devices
router.delete("/request_device", deleteAllRequestDevice );

// TABLE PUESTOS

// GET Puestos Activos por Cliente y Objetivo
router.get("/puestos/:idCliente/:idObjetivo", getPuestos);


//export default router;
module.exports = router;
