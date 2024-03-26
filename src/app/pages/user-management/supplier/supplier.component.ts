import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, catchError, tap, throwError } from "rxjs";
import { BC_SUPPLIER } from "../../../public/constants/bread-crumb";
import { COLUMN_OF_SUPPLIER } from "../../../public/constants/column-of-table";
import { UserService } from "../../../services/user/user.service";
import { SupplierModalComponent } from "./supplier-modal/supplier-modal.component";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
})
export class SupplierComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_SUPPLIER;
  public suppliers!: any[];
  public subscription$!: Subscription;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_SUPPLIER;
    this.getAllSupplier();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  private getAllSupplier() {
    this.userService.getAllSupplier().subscribe((res: any) => {
      this.suppliers = res;
    });
  }

  public onOpenAddModal() {
    const modalRef = this.modalService.open(SupplierModalComponent, {
      size: "lg",
      centered: true,
    });

    modalRef.componentInstance.titleHeading = "Thêm nhà cung cấp";
    this.subscription$ = modalRef.componentInstance.listChanged.subscribe(() =>
      this.getAllSupplier()
    );
  }

  public onOpenUpdateModal(id: string) {
    const modalRef = this.modalService.open(SupplierModalComponent, {
      size: "lg",
      centered: true,
    });

    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.supplierId = id;
    modalRef.componentInstance.titleHeading = "Sửa nhà cung cấp";
    this.subscription$ = modalRef.componentInstance.listChanged.subscribe(() =>
      this.getAllSupplier()
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

  public onDeleteSupplier(id: string) {
    this.onOpenConfirmModal(
      "Xoá nhà cung cấp",
      "Bạn có chắc chắn muốn xoá nhà cung cấp này ra khỏi hệ thống?"
    )
      .closed.pipe(
        tap((state: boolean) => {
          state && this.handleDeleteSupplier(id);
        })
      )
      .subscribe();
  }

  public handleDeleteSupplier(id: string) {
    this.userService
      .deleteSupplier(id)
      .pipe(
        tap(() => {
          this.toastService.success("Xoá thành công");
          this.getAllSupplier();
        }),
        catchError((error) => {
          this.toastService.error("Xoá thất bại");
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }
}
