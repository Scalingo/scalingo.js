/** @see https://developers.scalingo.com/alerts#create-a-new-alert */
export interface CreateParams {
    /** any container type of an application (e.g. web, clock…) */
    container_type?: string | null;
    /** Any float value. For any resource consumption, please provide 0.1 if you need to be alerted when the consumption goes above 10%. */
    limit?: number | null;
    /** e.g. RPM per container, RAM consumption… */
    metric?: string | null;
    /** list of notifier ID that will receive the alerts */
    notifiers?: string[] | null;
    /** will the alert be sent when the value goes above or below the limit */
    send_when_below?: boolean | null;
    /** the alert is triggered if the value is above the limit for the specified duration. Duration is expressed in nanoseconds. (optional) */
    duration_before_trigger?: number | null;
    /** whether the alert is disabled */
    disabled?: boolean | null;
}
/** @see https://developers.scalingo.com/alerts#update-an-alert */
export declare type UpdateParams = CreateParams;
//# sourceMappingURL=alerts.d.ts.map