/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getTodo } from "../graphql/queries";
import { updateTodo } from "../graphql/mutations";
export default function TodoUpdateForm(props) {
  const {
    id: idProp,
    todo: todoModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    projectName: "",
    projectVersion: "",
    backlog: "",
    ccoActual: "",
    ccoCommit: "",
    ccoTarget: "",
    csldUrl: "",
    icDate: "",
    platform_type: "",
    psirtClosed: "",
    psirtOpened: "",
    releaseStatus: "",
    releaseType: "",
    rvVerified: "",
    ssAttribute: "",
    status: "",
    timsSitUrl: "",
    tsAttribute: "",
  };
  const [projectName, setProjectName] = React.useState(
    initialValues.projectName
  );
  const [projectVersion, setProjectVersion] = React.useState(
    initialValues.projectVersion
  );
  const [backlog, setBacklog] = React.useState(initialValues.backlog);
  const [ccoActual, setCcoActual] = React.useState(initialValues.ccoActual);
  const [ccoCommit, setCcoCommit] = React.useState(initialValues.ccoCommit);
  const [ccoTarget, setCcoTarget] = React.useState(initialValues.ccoTarget);
  const [csldUrl, setCsldUrl] = React.useState(initialValues.csldUrl);
  const [icDate, setIcDate] = React.useState(initialValues.icDate);
  const [platform_type, setPlatform_type] = React.useState(
    initialValues.platform_type
  );
  const [psirtClosed, setPsirtClosed] = React.useState(
    initialValues.psirtClosed
  );
  const [psirtOpened, setPsirtOpened] = React.useState(
    initialValues.psirtOpened
  );
  const [releaseStatus, setReleaseStatus] = React.useState(
    initialValues.releaseStatus
  );
  const [releaseType, setReleaseType] = React.useState(
    initialValues.releaseType
  );
  const [rvVerified, setRvVerified] = React.useState(initialValues.rvVerified);
  const [ssAttribute, setSsAttribute] = React.useState(
    initialValues.ssAttribute
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [timsSitUrl, setTimsSitUrl] = React.useState(initialValues.timsSitUrl);
  const [tsAttribute, setTsAttribute] = React.useState(
    initialValues.tsAttribute
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = todoRecord
      ? { ...initialValues, ...todoRecord }
      : initialValues;
    setProjectName(cleanValues.projectName);
    setProjectVersion(cleanValues.projectVersion);
    setBacklog(cleanValues.backlog);
    setCcoActual(cleanValues.ccoActual);
    setCcoCommit(cleanValues.ccoCommit);
    setCcoTarget(cleanValues.ccoTarget);
    setCsldUrl(cleanValues.csldUrl);
    setIcDate(cleanValues.icDate);
    setPlatform_type(cleanValues.platform_type);
    setPsirtClosed(cleanValues.psirtClosed);
    setPsirtOpened(cleanValues.psirtOpened);
    setReleaseStatus(cleanValues.releaseStatus);
    setReleaseType(cleanValues.releaseType);
    setRvVerified(cleanValues.rvVerified);
    setSsAttribute(cleanValues.ssAttribute);
    setStatus(cleanValues.status);
    setTimsSitUrl(cleanValues.timsSitUrl);
    setTsAttribute(cleanValues.tsAttribute);
    setErrors({});
  };
  const [todoRecord, setTodoRecord] = React.useState(todoModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getTodo,
              variables: { id: idProp },
            })
          )?.data?.getTodo
        : todoModelProp;
      setTodoRecord(record);
    };
    queryData();
  }, [idProp, todoModelProp]);
  React.useEffect(resetStateValues, [todoRecord]);
  const validations = {
    projectName: [{ type: "Required" }],
    projectVersion: [],
    backlog: [],
    ccoActual: [],
    ccoCommit: [],
    ccoTarget: [],
    csldUrl: [],
    icDate: [],
    platform_type: [],
    psirtClosed: [],
    psirtOpened: [],
    releaseStatus: [],
    releaseType: [],
    rvVerified: [],
    ssAttribute: [],
    status: [],
    timsSitUrl: [],
    tsAttribute: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          projectName,
          projectVersion: projectVersion ?? null,
          backlog: backlog ?? null,
          ccoActual: ccoActual ?? null,
          ccoCommit: ccoCommit ?? null,
          ccoTarget: ccoTarget ?? null,
          csldUrl: csldUrl ?? null,
          icDate: icDate ?? null,
          platform_type: platform_type ?? null,
          psirtClosed: psirtClosed ?? null,
          psirtOpened: psirtOpened ?? null,
          releaseStatus: releaseStatus ?? null,
          releaseType: releaseType ?? null,
          rvVerified: rvVerified ?? null,
          ssAttribute: ssAttribute ?? null,
          status: status ?? null,
          timsSitUrl: timsSitUrl ?? null,
          tsAttribute: tsAttribute ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateTodo,
            variables: {
              input: {
                id: todoRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TodoUpdateForm")}
      {...rest}
    >
      <TextField
        label="Project name"
        isRequired={true}
        isReadOnly={false}
        value={projectName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName: value,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.projectName ?? value;
          }
          if (errors.projectName?.hasError) {
            runValidationTasks("projectName", value);
          }
          setProjectName(value);
        }}
        onBlur={() => runValidationTasks("projectName", projectName)}
        errorMessage={errors.projectName?.errorMessage}
        hasError={errors.projectName?.hasError}
        {...getOverrideProps(overrides, "projectName")}
      ></TextField>
      <TextField
        label="Project version"
        isRequired={false}
        isReadOnly={false}
        value={projectVersion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion: value,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.projectVersion ?? value;
          }
          if (errors.projectVersion?.hasError) {
            runValidationTasks("projectVersion", value);
          }
          setProjectVersion(value);
        }}
        onBlur={() => runValidationTasks("projectVersion", projectVersion)}
        errorMessage={errors.projectVersion?.errorMessage}
        hasError={errors.projectVersion?.hasError}
        {...getOverrideProps(overrides, "projectVersion")}
      ></TextField>
      <TextField
        label="Backlog"
        isRequired={false}
        isReadOnly={false}
        value={backlog}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog: value,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.backlog ?? value;
          }
          if (errors.backlog?.hasError) {
            runValidationTasks("backlog", value);
          }
          setBacklog(value);
        }}
        onBlur={() => runValidationTasks("backlog", backlog)}
        errorMessage={errors.backlog?.errorMessage}
        hasError={errors.backlog?.hasError}
        {...getOverrideProps(overrides, "backlog")}
      ></TextField>
      <TextField
        label="Cco actual"
        isRequired={false}
        isReadOnly={false}
        value={ccoActual}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual: value,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.ccoActual ?? value;
          }
          if (errors.ccoActual?.hasError) {
            runValidationTasks("ccoActual", value);
          }
          setCcoActual(value);
        }}
        onBlur={() => runValidationTasks("ccoActual", ccoActual)}
        errorMessage={errors.ccoActual?.errorMessage}
        hasError={errors.ccoActual?.hasError}
        {...getOverrideProps(overrides, "ccoActual")}
      ></TextField>
      <TextField
        label="Cco commit"
        isRequired={false}
        isReadOnly={false}
        value={ccoCommit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit: value,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.ccoCommit ?? value;
          }
          if (errors.ccoCommit?.hasError) {
            runValidationTasks("ccoCommit", value);
          }
          setCcoCommit(value);
        }}
        onBlur={() => runValidationTasks("ccoCommit", ccoCommit)}
        errorMessage={errors.ccoCommit?.errorMessage}
        hasError={errors.ccoCommit?.hasError}
        {...getOverrideProps(overrides, "ccoCommit")}
      ></TextField>
      <TextField
        label="Cco target"
        isRequired={false}
        isReadOnly={false}
        value={ccoTarget}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget: value,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.ccoTarget ?? value;
          }
          if (errors.ccoTarget?.hasError) {
            runValidationTasks("ccoTarget", value);
          }
          setCcoTarget(value);
        }}
        onBlur={() => runValidationTasks("ccoTarget", ccoTarget)}
        errorMessage={errors.ccoTarget?.errorMessage}
        hasError={errors.ccoTarget?.hasError}
        {...getOverrideProps(overrides, "ccoTarget")}
      ></TextField>
      <TextField
        label="Csld url"
        isRequired={false}
        isReadOnly={false}
        value={csldUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl: value,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.csldUrl ?? value;
          }
          if (errors.csldUrl?.hasError) {
            runValidationTasks("csldUrl", value);
          }
          setCsldUrl(value);
        }}
        onBlur={() => runValidationTasks("csldUrl", csldUrl)}
        errorMessage={errors.csldUrl?.errorMessage}
        hasError={errors.csldUrl?.hasError}
        {...getOverrideProps(overrides, "csldUrl")}
      ></TextField>
      <TextField
        label="Ic date"
        isRequired={false}
        isReadOnly={false}
        value={icDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate: value,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.icDate ?? value;
          }
          if (errors.icDate?.hasError) {
            runValidationTasks("icDate", value);
          }
          setIcDate(value);
        }}
        onBlur={() => runValidationTasks("icDate", icDate)}
        errorMessage={errors.icDate?.errorMessage}
        hasError={errors.icDate?.hasError}
        {...getOverrideProps(overrides, "icDate")}
      ></TextField>
      <TextField
        label="Platform type"
        isRequired={false}
        isReadOnly={false}
        value={platform_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type: value,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.platform_type ?? value;
          }
          if (errors.platform_type?.hasError) {
            runValidationTasks("platform_type", value);
          }
          setPlatform_type(value);
        }}
        onBlur={() => runValidationTasks("platform_type", platform_type)}
        errorMessage={errors.platform_type?.errorMessage}
        hasError={errors.platform_type?.hasError}
        {...getOverrideProps(overrides, "platform_type")}
      ></TextField>
      <TextField
        label="Psirt closed"
        isRequired={false}
        isReadOnly={false}
        value={psirtClosed}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed: value,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.psirtClosed ?? value;
          }
          if (errors.psirtClosed?.hasError) {
            runValidationTasks("psirtClosed", value);
          }
          setPsirtClosed(value);
        }}
        onBlur={() => runValidationTasks("psirtClosed", psirtClosed)}
        errorMessage={errors.psirtClosed?.errorMessage}
        hasError={errors.psirtClosed?.hasError}
        {...getOverrideProps(overrides, "psirtClosed")}
      ></TextField>
      <TextField
        label="Psirt opened"
        isRequired={false}
        isReadOnly={false}
        value={psirtOpened}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened: value,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.psirtOpened ?? value;
          }
          if (errors.psirtOpened?.hasError) {
            runValidationTasks("psirtOpened", value);
          }
          setPsirtOpened(value);
        }}
        onBlur={() => runValidationTasks("psirtOpened", psirtOpened)}
        errorMessage={errors.psirtOpened?.errorMessage}
        hasError={errors.psirtOpened?.hasError}
        {...getOverrideProps(overrides, "psirtOpened")}
      ></TextField>
      <TextField
        label="Release status"
        isRequired={false}
        isReadOnly={false}
        value={releaseStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus: value,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.releaseStatus ?? value;
          }
          if (errors.releaseStatus?.hasError) {
            runValidationTasks("releaseStatus", value);
          }
          setReleaseStatus(value);
        }}
        onBlur={() => runValidationTasks("releaseStatus", releaseStatus)}
        errorMessage={errors.releaseStatus?.errorMessage}
        hasError={errors.releaseStatus?.hasError}
        {...getOverrideProps(overrides, "releaseStatus")}
      ></TextField>
      <TextField
        label="Release type"
        isRequired={false}
        isReadOnly={false}
        value={releaseType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType: value,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.releaseType ?? value;
          }
          if (errors.releaseType?.hasError) {
            runValidationTasks("releaseType", value);
          }
          setReleaseType(value);
        }}
        onBlur={() => runValidationTasks("releaseType", releaseType)}
        errorMessage={errors.releaseType?.errorMessage}
        hasError={errors.releaseType?.hasError}
        {...getOverrideProps(overrides, "releaseType")}
      ></TextField>
      <TextField
        label="Rv verified"
        isRequired={false}
        isReadOnly={false}
        value={rvVerified}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified: value,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.rvVerified ?? value;
          }
          if (errors.rvVerified?.hasError) {
            runValidationTasks("rvVerified", value);
          }
          setRvVerified(value);
        }}
        onBlur={() => runValidationTasks("rvVerified", rvVerified)}
        errorMessage={errors.rvVerified?.errorMessage}
        hasError={errors.rvVerified?.hasError}
        {...getOverrideProps(overrides, "rvVerified")}
      ></TextField>
      <TextField
        label="Ss attribute"
        isRequired={false}
        isReadOnly={false}
        value={ssAttribute}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute: value,
              status,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.ssAttribute ?? value;
          }
          if (errors.ssAttribute?.hasError) {
            runValidationTasks("ssAttribute", value);
          }
          setSsAttribute(value);
        }}
        onBlur={() => runValidationTasks("ssAttribute", ssAttribute)}
        errorMessage={errors.ssAttribute?.errorMessage}
        hasError={errors.ssAttribute?.hasError}
        {...getOverrideProps(overrides, "ssAttribute")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status: value,
              timsSitUrl,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Tims sit url"
        isRequired={false}
        isReadOnly={false}
        value={timsSitUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl: value,
              tsAttribute,
            };
            const result = onChange(modelFields);
            value = result?.timsSitUrl ?? value;
          }
          if (errors.timsSitUrl?.hasError) {
            runValidationTasks("timsSitUrl", value);
          }
          setTimsSitUrl(value);
        }}
        onBlur={() => runValidationTasks("timsSitUrl", timsSitUrl)}
        errorMessage={errors.timsSitUrl?.errorMessage}
        hasError={errors.timsSitUrl?.hasError}
        {...getOverrideProps(overrides, "timsSitUrl")}
      ></TextField>
      <TextField
        label="Ts attribute"
        isRequired={false}
        isReadOnly={false}
        value={tsAttribute}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectName,
              projectVersion,
              backlog,
              ccoActual,
              ccoCommit,
              ccoTarget,
              csldUrl,
              icDate,
              platform_type,
              psirtClosed,
              psirtOpened,
              releaseStatus,
              releaseType,
              rvVerified,
              ssAttribute,
              status,
              timsSitUrl,
              tsAttribute: value,
            };
            const result = onChange(modelFields);
            value = result?.tsAttribute ?? value;
          }
          if (errors.tsAttribute?.hasError) {
            runValidationTasks("tsAttribute", value);
          }
          setTsAttribute(value);
        }}
        onBlur={() => runValidationTasks("tsAttribute", tsAttribute)}
        errorMessage={errors.tsAttribute?.errorMessage}
        hasError={errors.tsAttribute?.hasError}
        {...getOverrideProps(overrides, "tsAttribute")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || todoModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || todoModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
