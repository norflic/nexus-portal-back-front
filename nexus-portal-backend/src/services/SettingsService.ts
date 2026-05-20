import SettingsRepository from '../repository/SettingsRepository.js';
import UserRepository from '../repository/UserRepository.js';

async function getSettingsByUserId(uid: number) {
    const usr = await UserRepository.getUserById(uid)
}

async function getSettingsByUsername(email: string) {
    const usr = await UserRepository.getUserByEmail(email);
    if (usr) {
        
    }
}