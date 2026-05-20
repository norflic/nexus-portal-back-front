import {
    Admin,
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    FunctionField,
    List,
    required,
    Resource,
    SimpleForm,
    TextField,
    TextInput,
} from "react-admin";
import adminDataProvider from "./adminDataProvider";
import {adminResources} from "./adminResources";

type JsonRecord = Record<string, unknown>;

type JsonFormData = {
    id?: string | number;
    json?: string;
};

const stringifyJson = (value: unknown): string => JSON.stringify(value, null, 2);

const parseJsonObject = (value: unknown): JsonRecord => {
    const parsed = JSON.parse(String(value ?? "{}")) as unknown;

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error("The JSON payload must be an object.");
    }

    return parsed as JsonRecord;
};

const getRecordPreview = (record: unknown): string => {
    const json = stringifyJson(record);
    const maxLength = 160;

    return json.length > maxLength ? `${json.slice(0, maxLength)}...` : json;
};

const JsonPayloadInput = ({defaultValue}: { defaultValue?: string }) => (
    <TextInput
        source="json"
        label="JSON payload"
        multiline
        fullWidth
        minRows={18}
        defaultValue={defaultValue}
        validate={required()}
    />
);

const getEditDefaultValues = (record: JsonRecord | undefined): JsonFormData => ({
    id: typeof record?.id === "number" || typeof record?.id === "string" ? record.id : undefined,
    json: stringifyJson(record ?? {}),
});

const GenericList = () => (
    <List perPage={25}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
            <TextField source="id"/>
            <FunctionField
                label="Data"
                render={(record) => getRecordPreview(record)}
            />
            <EditButton/>
            <DeleteButton mutationMode="pessimistic"/>
        </Datagrid>
    </List>
);

const GenericCreate = () => (
    <Create
        mutationMode="pessimistic"
        transform={(data: JsonFormData) => parseJsonObject(data.json)}
    >
        <SimpleForm>
            <JsonPayloadInput defaultValue="{}"/>
        </SimpleForm>
    </Create>
);

const GenericEdit = () => (
    <Edit
        mutationMode="pessimistic"
        transform={(data: JsonFormData, context) => {
            const payload = parseJsonObject(data.json);

            if (!("id" in payload) && context?.previousData?.id !== undefined) {
                payload.id = context.previousData.id;
            }

            return payload;
        }}
    >
        <SimpleForm defaultValues={getEditDefaultValues}>
            <TextInput source="id" disabled/>
            <JsonPayloadInput/>
        </SimpleForm>
    </Edit>
);

export default function AdminPage() {
    return (
        <Admin basename="/admin" dataProvider={adminDataProvider}>
            {adminResources.map((resource) => (
                <Resource
                    key={resource.name}
                    name={resource.name}
                    options={{label: resource.label}}
                    list={GenericList}
                    create={GenericCreate}
                    edit={GenericEdit}
                />
            ))}
        </Admin>
    );
}
