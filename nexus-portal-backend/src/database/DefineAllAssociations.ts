import { ClassGroupSequelize } from "../model/ClassGroup.js";
import { CompanySequelize } from "../model/Company.js";
import { FileSequelize } from "../model/File.js";
import { OfferSequelize } from "../model/Offer.js";
import { PipelineStepSequelize } from "../model/PipelineStep.js";
import { PreferenceSequelize } from "../model/Preference.js";
import { SettingsSequelize } from "../model/Settings.js";
import { TagSequelize } from "../model/Tag.js";
import { UserSequelize } from "../model/users/User.js";

const fkAllowNull = {
    foreignKey: {
        allowNull: true,
    },
};

function createConstr(fk_name: string, fk_allow_null: boolean = true) {
    return {
        foreignKey: {
            name: fk_name,
            allowNull: fk_allow_null,
        },
    };
}

export function DefineAllAssociations() {
    console.log("Defining associations...");

    // User -> PipelineStep (One user to one pipeline step)
    UserSequelize.hasOne(PipelineStepSequelize, createConstr("user_id", false));
    PipelineStepSequelize.belongsTo(UserSequelize, createConstr("user_id", false));

    // User -> ClassGroup (Many users to one class group)
    UserSequelize.belongsTo(ClassGroupSequelize, createConstr("class_group_id", true));
    ClassGroupSequelize.hasMany(UserSequelize, createConstr("class_group_id", true));

    // User -> Preference (One user has many preferences)
    UserSequelize.hasMany(PreferenceSequelize, createConstr("user_id", true));
    PreferenceSequelize.belongsTo(UserSequelize, createConstr("user_id", true));

    // User -> Company (Many users to one company)
    UserSequelize.belongsTo(CompanySequelize, createConstr("company_id", true));
    CompanySequelize.hasMany(UserSequelize, createConstr("company_id", true));

    // User -> Settings (One user has one instance of Settings)
    UserSequelize.belongsTo(SettingsSequelize, createConstr("settings_id", false));

    // Offer <-> Tag (Many-to-many)
    OfferSequelize.belongsToMany(TagSequelize, {
        through: "Offer_Tags",
        foreignKey: "offer_id",
        otherKey: "tag_id",
        as: "tags",
    });
    TagSequelize.belongsToMany(OfferSequelize, {
        through: "Offer_Tags",
        foreignKey: "tag_id",
        otherKey: "offer_id",
        as: "tags",
    });

    OfferSequelize.belongsToMany(UserSequelize, {
        through: "User_Offer",
        foreignKey: "offer_id",
        otherKey: "user_id",
        as: "users",
    });
    UserSequelize.belongsToMany(OfferSequelize, {
        through: "User_Offer",
        foreignKey: "user_id",
        otherKey: "offer_id",
        as: "offers",
    });

    // PipelineStep <-> File (Many-to-many)
    PipelineStepSequelize.belongsToMany(FileSequelize, {
        through: "Pipeline_Step_Files",
        foreignKey: "pipeline_step_id",
        otherKey: "file_id",
    });
    FileSequelize.belongsToMany(PipelineStepSequelize, {
        through: "Pipeline_Step_Files",
        foreignKey: "file_id",
        otherKey: "pipeline_step_id",
    });

    console.log("Associations are defined");
}

