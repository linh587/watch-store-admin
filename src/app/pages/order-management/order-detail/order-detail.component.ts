import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../services/order/order.service";
import {
  BehaviorSubject,
  Subject,
  catchError,
  forkJoin,
  map,
  mergeMap,
  takeUntil,
  tap,
  throwError,
} from "rxjs";
import { ProductService } from "../../../services/product/product.service";
import { createCloudinaryImageLink } from "../../../public/helpers/images";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "../../../services/storage/storage.service";
import { ORDER_STATUS } from "../../../public/constants/common";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public breadCrumbItems!: Array<{}>;
  public orderId!: string;
  public orderDetail$ = new BehaviorSubject<any>(null);
  public detailProducts$ = new BehaviorSubject<any>(null);
  public createCloudinaryImageLink = createCloudinaryImageLink;
  public orderStatus$ = new BehaviorSubject<any>(null);
  public ORDER_STATUS = ORDER_STATUS;
  public staffAccountId!: string;
  public subscription$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private orderSerivce: OrderService,
    private productService: ProductService,
    private toastService: ToastrService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Đơn hàng chi tiết", active: true }];
    this.getIdOrderDetail();
    this.getOrderDetail();
    this.getStaffAcountId();
  }

  private getStaffAcountId() {
    this.staffAccountId = this.storageService.get("USER_LOGIN").id;
  }

  private getIdOrderDetail() {
    this.route.params.subscribe((params) => {
      this.orderId = params["id"];
    });
  }

  private getOrderDetail() {
    this.orderSerivce.getOrderDetail(this.orderId).subscribe((res: any) => {
      this.orderDetail$.next(res);
      this.orderStatus$.next(res.status);
      this.getProduct();
    });
  }

  private getProduct() {
    this.orderDetail$
      .pipe(
        takeUntil(this.subscription$),
        mergeMap((res: any) => {
          const detailObservables = res?.details?.map((detail: any) =>
            this.productService
              .getDetailProductPrice(detail.productPriceId)
              .pipe(
                mergeMap((productPrice: any) =>
                  forkJoin({
                    productInfo: this.productService.getDetailProduct(
                      productPrice.productId
                    ),
                    productSize: this.productService.getDetailProductSize(
                      productPrice.productSizeId
                    ),
                  }).pipe(
                    map((data: any) => {
                      return {
                        detail: detail,
                        productPrice: productPrice,
                        productInfo: data.productInfo,
                        productSize: data.productSize,
                      };
                    })
                  )
                )
              )
          );

          return forkJoin(detailObservables);
        })
      )
      .subscribe((combinedData: any) => {
        this.detailProducts$.next(combinedData);
      });
  }

  public verifyOrder() {
    const payload = {
      staffAccountId: this.staffAccountId,
    };
    this.orderSerivce
      .verifyOrder(this.orderId, payload)
      .pipe(
        tap((res: any) => {
          this.toastService.success("Duyệt thành công");
          this.orderStatus$.next(res);
        }),
        catchError((error) => {
          this.toastService.error("Duyệt thất bại");
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  public deliveryOrder() {
    const payload = {
      staffAccountId: this.staffAccountId,
    };
    this.orderSerivce
      .deliveryOrder(this.orderId, payload)
      .pipe(
        tap((res: any) => {
          this.toastService.success("Chuyển trạng thái thành công");
          this.orderStatus$.next(res);
        }),
        catchError((error) => {
          this.toastService.error("Chuyển trạng thái thất bại");
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  public verifyReceivedOrder() {
    const payload = {
      staffAccountId: this.staffAccountId,
    };
    this.orderSerivce
      .verifyReceivedOrder(this.orderId, payload)
      .pipe(
        tap((res: any) => {
          this.toastService.success("Chuyển trạng thái thành công");
          this.orderStatus$.next(res);
        }),
        catchError((error) => {
          this.toastService.error("Chuyển trạng thái thất bại");
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  public cancelOrder() {
    const payload = {
      staffAccountId: this.staffAccountId,
    };
    this.orderSerivce
      .canceldOrder(this.orderId, payload)
      .pipe(
        tap((res: any) => {
          this.toastService.success("Huỷ thành công");
          this.orderStatus$.next(res);
        }),
        catchError((error) => {
          this.toastService.error("Huỷ thất bại");
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription$.next(null);
    this.subscription$.complete();
  }
}
