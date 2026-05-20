import DefineApplicationEndpoints from "./ApplicationEndpoints.js";
import DefineClassGroupEndpoints from "./ClassGroupEndpoints.js";
import DefineCompanyEndpoints from "./CompanyEndpoints.js";
import DefineDefenseEndpoints from "./DefenseEndpoints.js";
import DefineFileEndpoints from "./FileEnpoints.js";
import DefineOfferEndpoints from "./OfferEndpoints.js";
import DefinePipelineStepEndpoints from "./PipelineStepEndpoints.js";
import DefinePreferenceEndpoints from "./PreferenceEndpoints.js";
import DefineTagEndpoints from "./TagEndpoints.js";

const endpointList: (() => void)[] = [
    DefineApplicationEndpoints,
    DefineCompanyEndpoints,
    DefineDefenseEndpoints,
    DefineFileEndpoints,
    DefinePipelineStepEndpoints,
    DefinePreferenceEndpoints,
    DefineClassGroupEndpoints,
    DefineOfferEndpoints,
    DefineTagEndpoints
]

export default function DefineAllEndpoints() {
    endpointList.forEach((DefineEndpoint) => {
        DefineEndpoint();
    });
}