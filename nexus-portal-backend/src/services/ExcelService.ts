
import XLJS from "exceljs";
import fs from "fs";
import { getAvailability } from "./ReadRoomAvailability.js";

const workbook = new XLJS.Workbook();

export async function getXLSXsheets(path: string) {
    const realpath = fs.realpathSync(path);
    const xlsx = await workbook.xlsx.readFile(realpath);

    if(xlsx.worksheets[0]) {
        getAvailability(xlsx.worksheets[0]);
    }

    return xlsx.worksheets;
}

