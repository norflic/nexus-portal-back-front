import { SettingsSequelize } from "../model/Settings.js";
import { SettingsSet, SettingsSetPartial } from "../types/SettingsSet.js";

async function create(settings: SettingsSetPartial) {
    return SettingsSequelize.create(settings);
}

async function getOne(id: number) {
    return SettingsSequelize.findByPk(id);
}

async function update(id: number, settings: SettingsSetPartial) {
    return SettingsSequelize.update(settings, {
        where: {
            id: id
        }
    });
}

async function del(id: number) {
    return SettingsSequelize.destroy({
        where: {
            id: id
        }
    })
}

const SettingsRepository = {
    create,
    getOne,
    update,
    del
}

export default SettingsRepository;