import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/survices/cart.service';
import { ProductService } from 'src/app/survices/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  
  constructor(private _ProductService: ProductService,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private toastr: ToastrService
  ) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 5000, 
    autoplayHoverPause: true,  // Pause autoplay on hover
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  

productId:string='';
productInfo:any;//(any) cuse i did not do interface for gitProductById()
loading:boolean=true;


  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params=>{this.productId=params['id']})

    this._ProductService.gitProductById(this.productId).subscribe({
      next: (res)=>{
        this.productInfo=res.data;
        this.loading=false;
      },
      error:(err)=>{
        console.log(err)
        this.loading=false;
      }
      
    })
  }

  addProductToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{this.toastr.success(res.message);
        this._CartService.countOfCart.next(res.numOfCartItems)
      },
      error:(err)=>{console.log(err)}
    })
  
  }
  

}
