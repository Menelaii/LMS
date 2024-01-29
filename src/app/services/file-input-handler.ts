import {NzUploadChangeParam} from "ng-zorro-antd/upload";

export class FileInputHandler {
  selectedFile: File | null = null;

  constructor() {
  }

  onFileChangedNative($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }

  onFileChanged($event: NzUploadChangeParam) {
    const file = $event.file.originFileObj;
    if (!file) {
      return;
    }
    this.selectedFile = file;
  }

  reset() {
    this.selectedFile = null;
  }

  getSelectedFileName():string {
    return this.selectedFile?.name ?? '';
  }

  isPresent():boolean {
    return this.selectedFile != null;
  }
}
