export as namespace esprima;

export interface Position {
  line: number;
  column: number;
}

export interface SourceLocation {
  source?: string | null;
  start: Position;
  end: Position;
}

export interface Node {
  type: string;
  range?: [number, number];
  loc?: SourceLocation;
  [key: string]: any;
}

export interface Program extends Node {
  type: 'Program';
  sourceType: 'script' | 'module';
  body: Node[];
  comments?: Comment[];
  tokens?: Token[];
  errors?: Error[];
}

export interface Comment {
  type: 'Line' | 'Block';
  value: string;
  range?: [number, number];
  loc?: SourceLocation;
}

export interface Token {
  type: string;
  value: string;
  regex?: { pattern: string; flags: string };
  range?: [number, number];
  loc?: SourceLocation;
}

export interface Error {
  name: string;
  message: string;
  stack?: string;
  index: number;
  lineNumber: number;
  column: number;
  description: string;
}

export interface ParseOptions {
  sourceType?: 'script' | 'module';
  jsx?: boolean;
  range?: boolean;
  loc?: boolean;
  source?: string;
  tokens?: boolean;
  comment?: boolean;
  attachComment?: boolean;
  tolerant?: boolean;
  raw?: boolean;
  [key: string]: any;
}

export type Delegate = (node: Node, metadata: any) => void;
export type TokenDelegate = (token: Token) => Token;

export function parse(code: string | String, options?: ParseOptions, delegate?: Delegate): Program;
export function parseScript(code: string | String, options?: ParseOptions, delegate?: Delegate): Program;
export function parseModule(code: string | String, options?: ParseOptions, delegate?: Delegate): Program;
export function tokenize(code: string | String, options?: ParseOptions, delegate?: TokenDelegate): Token[];

export const Syntax: { [name: string]: string };
export const version: '4.0.1';
