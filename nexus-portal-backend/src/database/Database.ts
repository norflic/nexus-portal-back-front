
import { ApplicationSequelize } from '../model/Application.js';
import { ClassGroupSequelize } from '../model/ClassGroup.js';
import { CompanySequelize } from '../model/Company.js';
import { DefenseSequelize } from '../model/Defense.js';
import { FileSequelize } from '../model/File.js';
import { OfferSequelize } from '../model/Offer.js';
import { OfferTagsSequelize } from '../model/OfferTagsSequelize.js';
import { PipelineStepSequelize } from '../model/PipelineStep.js';
import { PipelineStepFilesSequelize } from '../model/PipelineStepFiles.js';
import { PreferenceSequelize } from '../model/Preference.js';
import { SettingsSequelize } from '../model/Settings.js';
import { TagSequelize } from '../model/Tag.js';
import { UserOfferSequelize } from '../model/UserOfferSequelize.js';
import { UserSequelize } from '../model/users/User.js';
import { UserTypeSequelize } from '../model/users/UserType.js';

const models = [
    TagSequelize,
    CompanySequelize,
    ClassGroupSequelize,
    SettingsSequelize,

    UserTypeSequelize,
    ApplicationSequelize,
    DefenseSequelize,
    UserSequelize,
    FileSequelize,
    OfferSequelize,
    PipelineStepSequelize,
    PreferenceSequelize,

    OfferTagsSequelize,
    PipelineStepFilesSequelize,
    UserOfferSequelize
];

export async function SyncAllModels(alter: boolean) {
    console.log("Syncing models...");
    
    for (const model of models) {
        await model.sync({ alter: alter });
    }
    
    console.log("Models are synchronized.");
}