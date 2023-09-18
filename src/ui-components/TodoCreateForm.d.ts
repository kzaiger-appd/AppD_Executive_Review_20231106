/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodoCreateFormInputValues = {
    projectName?: string;
    projectVersion?: string;
    backlog?: string;
    ccoActual?: string;
    ccoCommit?: string;
    ccoTarget?: string;
    csldUrl?: string;
    icDate?: string;
    platform_type?: string;
    psirtClosed?: string;
    psirtOpened?: string;
    releaseStatus?: string;
    releaseType?: string;
    rvVerified?: string;
    ssAttribute?: string;
    status?: string;
    timsSitUrl?: string;
    tsAttribute?: string;
};
export declare type TodoCreateFormValidationValues = {
    projectName?: ValidationFunction<string>;
    projectVersion?: ValidationFunction<string>;
    backlog?: ValidationFunction<string>;
    ccoActual?: ValidationFunction<string>;
    ccoCommit?: ValidationFunction<string>;
    ccoTarget?: ValidationFunction<string>;
    csldUrl?: ValidationFunction<string>;
    icDate?: ValidationFunction<string>;
    platform_type?: ValidationFunction<string>;
    psirtClosed?: ValidationFunction<string>;
    psirtOpened?: ValidationFunction<string>;
    releaseStatus?: ValidationFunction<string>;
    releaseType?: ValidationFunction<string>;
    rvVerified?: ValidationFunction<string>;
    ssAttribute?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    timsSitUrl?: ValidationFunction<string>;
    tsAttribute?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodoCreateFormOverridesProps = {
    TodoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    projectName?: PrimitiveOverrideProps<TextFieldProps>;
    projectVersion?: PrimitiveOverrideProps<TextFieldProps>;
    backlog?: PrimitiveOverrideProps<TextFieldProps>;
    ccoActual?: PrimitiveOverrideProps<TextFieldProps>;
    ccoCommit?: PrimitiveOverrideProps<TextFieldProps>;
    ccoTarget?: PrimitiveOverrideProps<TextFieldProps>;
    csldUrl?: PrimitiveOverrideProps<TextFieldProps>;
    icDate?: PrimitiveOverrideProps<TextFieldProps>;
    platform_type?: PrimitiveOverrideProps<TextFieldProps>;
    psirtClosed?: PrimitiveOverrideProps<TextFieldProps>;
    psirtOpened?: PrimitiveOverrideProps<TextFieldProps>;
    releaseStatus?: PrimitiveOverrideProps<TextFieldProps>;
    releaseType?: PrimitiveOverrideProps<TextFieldProps>;
    rvVerified?: PrimitiveOverrideProps<TextFieldProps>;
    ssAttribute?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    timsSitUrl?: PrimitiveOverrideProps<TextFieldProps>;
    tsAttribute?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoCreateFormProps = React.PropsWithChildren<{
    overrides?: TodoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TodoCreateFormInputValues) => TodoCreateFormInputValues;
    onSuccess?: (fields: TodoCreateFormInputValues) => void;
    onError?: (fields: TodoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoCreateFormInputValues) => TodoCreateFormInputValues;
    onValidate?: TodoCreateFormValidationValues;
} & React.CSSProperties>;
export default function TodoCreateForm(props: TodoCreateFormProps): React.ReactElement;
