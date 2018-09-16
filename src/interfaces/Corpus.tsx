export default interface ICorpus {
    feature_type: string;
    filesystem_path: string;
    id: number;
    label_type: string;
    max_samples: number;
    name: string;
    preprocessed: boolean;
    testing: number[];
    training: number[];
    validation: number[];
}