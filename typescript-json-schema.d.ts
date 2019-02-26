import * as ts from "typescript";
export { Program, CompilerOptions } from "typescript";
export declare function getDefaultArgs(): Args;
export declare type ValidationKeywords = {
    [prop: string]: boolean;
};
export declare type Args = {
    ref: boolean;
    aliasRef: boolean;
    topRef: boolean;
    titles: boolean;
    defaultProps: boolean;
    noExtraProps: boolean;
    propOrder: boolean;
    typeOfKeyword: boolean;
    required: boolean;
    strictNullChecks: boolean;
    ignoreErrors: boolean;
    out: string;
    validationKeywords: string[];
    excludePrivate: boolean;
};
export declare type PartialArgs = Partial<Args>;
export declare type PrimitiveType = number | boolean | string | null;
export declare type Definition = {
    $ref?: string;
    description?: string;
    allOf?: Definition[];
    oneOf?: Definition[];
    anyOf?: Definition[];
    title?: string;
    type?: string | string[];
    definitions?: {
        [key: string]: any;
    };
    format?: string;
    items?: Definition | Definition[];
    minItems?: number;
    additionalItems?: {
        anyOf: Definition[];
    };
    enum?: PrimitiveType[] | Definition[];
    default?: PrimitiveType | Object;
    additionalProperties?: Definition | boolean;
    required?: string[];
    propertyOrder?: string[];
    properties?: {};
    defaultProperties?: string[];
    typeof?: "function";
};
export declare class JsonSchemaGenerator {
    private args;
    private static validationKeywords;
    private allSymbols;
    private userSymbols;
    private inheritingTypes;
    private tc;
    private reffedDefinitions;
    private userValidationKeywords;
    private typeNamesById;
    private typeNamesUsed;
    constructor(allSymbols: {
        [name: string]: ts.Type;
    }, userSymbols: {
        [name: string]: ts.Symbol;
    }, inheritingTypes: {
        [baseName: string]: string[];
    }, tc: ts.TypeChecker, args?: Args);
    readonly ReffedDefinitions: {
        [key: string]: Definition;
    };
    private static parseValue;
    private parseCommentsIntoDefinition;
    private static extractLiteralValue;
    private static resolveTupleType;
    private getDefinitionForRootType;
    private static getReferencedTypeSymbol;
    private getDefinitionForProperty;
    private getEnumDefinition;
    private getUnionDefinition;
    private getClassDefinition;
    private simpleTypesAllowedProperties;
    private addSimpleType;
    private makeNullable;
    private getTypeName;
    private getTypeDefinition;
    setSchemaOverride(symbolName: string, schema: Definition): void;
    getSchemaForSymbol(symbolName: string, includeReffedDefinitions?: boolean): Definition;
    getSchemaForSymbols(symbolNames: string[], includeReffedDefinitions?: boolean): Definition;
    getUserSymbols(): string[];
    getMainFileSymbols(program: ts.Program): string[];
}
export declare function getProgramFromFiles(files: string[], jsonCompilerOptions?: any, basePath?: string): ts.Program;
export declare function buildGenerator(program: ts.Program, args?: PartialArgs): JsonSchemaGenerator | null;
export declare function generateSchema(program: ts.Program, fullTypeName: string, args?: PartialArgs): Definition | null;
export declare function programFromConfig(configFileName: string): ts.Program;
export declare function exec(filePattern: string, fullTypeName: string, args?: Args): void;
export declare function run(): void;
