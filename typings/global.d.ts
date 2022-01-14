// @ts-ignore
declare global {
    import process from 'process';
    import { Buffer } from "buffer";
    import EventEmitter from 'events';
    import '@types/systemjs'

    interface Window {
        Buffer: typeof Buffer;
        EventEmitter: typeof EventEmitter;
        process: typeof process;
    }
}
