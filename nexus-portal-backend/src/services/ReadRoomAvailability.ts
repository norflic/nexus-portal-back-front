import XLSX from "exceljs";
import { DefenseAvailability } from "../model/Availability.js";

export function getAvailability(sheet: XLSX.Worksheet): void {
    console.log(`actual column count : ${sheet.actualColumnCount}`);
    console.log(`actual row count : ${sheet.actualRowCount}`);
}