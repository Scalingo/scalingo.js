export interface CronJob {
    command: string;
    size?: string | null;
    last_execution_date?: string | null;
    next_execution_date?: string | null;
}
export interface CronDefinition {
    jobs: CronJob[] | null;
    deployment_id: string | null;
}
//# sourceMappingURL=cron_tasks.d.ts.map