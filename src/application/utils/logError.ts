type LogErrorProps = {
  type: "HTTP" | "LOCAL";
  handler: string;
};

export function LogError(error: any, props: LogErrorProps) {
  const errorLog = `ERROR_${props.type} [${props.handler.toUpperCase()}]:`;

  console.log(errorLog, error);
}
