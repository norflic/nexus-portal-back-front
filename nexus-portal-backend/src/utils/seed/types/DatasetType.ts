import {CreateClassGroup} from "../../../model/ClassGroup.js"
import {CreateCompany} from "../../../model/Company.js"
import {CreateFile} from "../../../model/File.js"
import {CreateOffer} from "../../../model/Offer.js"
import {CreateTag} from "../../../model/Tag.js"
import {CreateUser} from "../../../model/users/User.js"
import {CreateDefense} from "../../../model/Defense.js";


type DatasetType = {
    users: CreateUser[]
    company: CreateCompany[],
    classgroups: CreateClassGroup[],
    tags: CreateTag[],
    offers: CreateOffer[],
    defense: CreateDefense[]
    files: CreateFile[],
}

export default DatasetType;
