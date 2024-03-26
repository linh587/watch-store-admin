import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  BehaviorSubject,
  Subscription,
  catchError,
  tap,
  throwError,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { COLUMN_OF_RECEIPT } from "../../public/constants/column-of-table";
import { UserService } from "../../services/user/user.service";
import { BC_SUPPLIER } from "../../public/constants/bread-crumb";
import { ReceiptModalComponent } from "./receipt-modal/receipt-modal.component";
import { ConfirmModalComponent } from "../../components/confirm-modal/confirm-modal.component";
import { ReceiptService } from "../../services/receipt/receipt.service";

@Component({
  selector: "app-receipt-management",
  templateUrl: "./receipt-management.component.html",
})
export class ReceiptManagementComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_RECEIPT;
  public receipts: any[] = [];
  public subscription$!: Subscription;
  public suppliers$ = new BehaviorSubject<any>([]);

  constructor(
    private modalService: NgbModal,
    private toastService: ToastrService,
    private receiptService: ReceiptService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_SUPPLIER;
    this.getAllSupplier();
    this.getAllReceipt();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public getAllSupplier() {
    this.userService.getAllSupplier().subscribe((res: any) => {
      this.suppliers$.next(res);
    });
  }

  private getAllReceipt() {
    this.receiptService.getListReceipt().subscribe((res: any) => {
      this.receipts = res.data;
    });
  }

  public onOpenAddModal() {
    const modalRef = this.modalService.open(ReceiptModalComponent, {
      size: "lg",
      centered: true,
    });

    modalRef.componentInstance.titleHeading = "Thêm phiếu nhập";
  }

  public onOpenUpdateModal(id: string) {
    const modalRef = this.modalService.open(ReceiptModalComponent, {
      size: "lg",
      centered: true,
    });

    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.supplierId = id;
    modalRef.componentInstance.titleHeading = "Sửa phiếu nhập";
    this.subscription$ = modalRef.componentInstance.listChanged.subscribe(() =>
      this.getAllReceipt()
    );
  }

  public onOpenConfirmModal(title?: string, content?: string) {
    const modal = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    modal.componentInstance.title = title;
    modal.componentInstance.content = content;

    return modal;
  }

  // public onDeleteSupplier(id: string) {
  //   this.onOpenConfirmModal(
  //     "Xoá nhà cung cấp",
  //     "Bạn có chắc chắn muốn xoá nhà cung cấp này ra khỏi hệ thống?"
  //   )
  //     .closed.pipe(
  //       tap((state: boolean) => {
  //         state && this.handleDeleteSupplier(id);
  //       })
  //     )
  //     .subscribe();
  // }

  // public handleDeleteSupplier(id: string) {
  //   this.userService
  //     .deleteSupplier(id)
  //     .pipe(
  //       tap(() => {
  //         this.toastService.success("Xoá thành công");
  //         this.getAllReceipt();
  //       }),
  //       catchError((error) => {
  //         this.toastService.error("Xoá thất bại");
  //         return throwError(() => error);
  //       })
  //     )
  //     .subscribe();
  // }

  ngOnDestroy(): void {
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }
}
