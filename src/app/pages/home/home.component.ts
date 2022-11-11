import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }
  showMenu = false;
  variant = [];
  //showIntro = false;
  showIntro = true;
  step = 0;
  activity = 0;
  currencyOption = { prefix: '', thousands: ',', decimal: '', precision: 0 };
  profitability = [
    { name: "Sales Volume", symbol: "", input: true, sale_y1_p1: 500, sale_y1_p2: 800, sale_y2_p1: 700, sale_y2_p2: 800 },
    { name: "Sales Price per Unit", symbol: "$", input: true, sale_y1_p1: 500, sale_y1_p2: 250, sale_y2_p1: 500, sale_y2_p2: 250 },
    { name: "Material Costs per Unit", symbol: "$", input: true, sale_y1_p1: 350, sale_y1_p2: 200, sale_y2_p1: 350, sale_y2_p2: 200 },
    { name: "Logistics Costs per Unit", symbol: "$", input: true, sale_y1_p1: 20, sale_y1_p2: 20, sale_y2_p1: 20, sale_y2_p2: 20 },
    {
      name: "Material Margin per Unit", symbol: "$", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "",
      sale_y2_p1: "",
      sale_y2_p2: "",

      cal_sale_y1_p1: { type: "cur", text: "this.profitability[1].sale_y1_p1 - this.profitability[2].sale_y1_p1 - this.profitability[3].sale_y1_p1 " },
      cal_sale_y1_p2: { type: "cur", text: "this.profitability[1].sale_y1_p2 - this.profitability[2].sale_y1_p2 - this.profitability[3].sale_y1_p2 " },
      cal_sale_y2_p1: { type: "cur", text: "this.profitability[1].sale_y2_p1 - this.profitability[2].sale_y2_p1 - this.profitability[3].sale_y2_p1 " },
      cal_sale_y2_p2: { type: "cur", text: "this.profitability[1].sale_y2_p2 - this.profitability[2].sale_y2_p2 - this.profitability[3].sale_y2_p2 " },
    },
    { name: "Other Variable Costs per Unit", symbol: "$", input: true, sale_y1_p1: 25, sale_y1_p2: 25, sale_y2_p1: 25, sale_y2_p2: 25 },
    {
      name: "Contribution Margin per Unit", symbol: "$", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "",
      sale_y2_p1: "",
      sale_y2_p2: "",

      cal_sale_y1_p1: { type: "cur", text: "this.profitability[4].sale_y1_p1 - this.profitability[5].sale_y1_p1 " },
      cal_sale_y1_p2: { type: "cur", text: "this.profitability[4].sale_y1_p2 - this.profitability[5].sale_y1_p2 " },
      cal_sale_y2_p1: { type: "cur", text: "this.profitability[4].sale_y2_p1 - this.profitability[5].sale_y2_p1 " },
      cal_sale_y2_p2: { type: "cur", text: "this.profitability[4].sale_y2_p2 - this.profitability[5].sale_y2_p2 " },
    },
    {
      name: "% of Sales Mix", symbol: "$", input: false, percetage: true,
      klass: "bold",
      sale_y1_p1: 38,
      sale_y1_p2: 62,
      sale_y2_p1: 47,
      sale_y2_p2: 53,

      cal_sale_y1_p1: { type: "cur", text: "Math.round(this.profitability[0].sale_y1_p1 / (this.profitability[0].sale_y1_p1 +  this.profitability[0].sale_y1_p2) * 100)" },
      cal_sale_y1_p2: { type: "cur", text: "Math.round(this.profitability[0].sale_y1_p2 / (this.profitability[0].sale_y1_p1 +  this.profitability[0].sale_y1_p2) * 100) " },
      cal_sale_y2_p1: { type: "cur", text: "Math.round(this.profitability[0].sale_y2_p1 / (this.profitability[0].sale_y2_p1 +  this.profitability[0].sale_y2_p2) * 100) " },
      cal_sale_y2_p2: { type: "cur", text: "Math.round(this.profitability[0].sale_y2_p2 / (this.profitability[0].sale_y2_p1 +  this.profitability[0].sale_y2_p2) * 100) " },

    },
    { name: "Fixed Cost of Goods Sold", symbol: "$", input: true, sale_y1_p1: "empty", sale_y1_p2: 5000, sale_y2_p1: "empty", sale_y2_p2: 5000 },
    { name: "SG&A Expenses", symbol: "$", input: true, sale_y1_p1: "empty", sale_y1_p2: 1000, sale_y2_p1: "empty", sale_y2_p2: 1500 },
  ];

  income_statement = [
    {
      name: "Sales", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "(this.D5 * this.D6) +  (this.E5 * this.E6)" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "(this.G5 * this.G6) +  (this.H5 * this.H6)" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "Material Costs", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "(this.D5 * this.D7) +  (this.E5 * this.E7)" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "(this.G5 * this.G7) +  (this.H5 * this.H7)" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "Logistics Costs",
      input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",


      cal_sale_y1_p1: { type: "cur", text: "(this.D5 * this.D8) +  (this.E5 * this.E8)" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "(this.G5 * this.G8) +  (this.H5 * this.H8)" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "Material margin", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "",
      sale_y2_p1: "",
      sale_y2_p2: "",
      variant: "",

      //D27
      cal_sale_y1_p1: { type: "cur", text: "((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8))" },
      cal_sale_y1_p2: { type: "per", text: "Math.round((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8))) / ((this.D5 * this.D6) +  (this.E5 * this.E6)) * 100 )" },
      cal_sale_y2_p1: { type: "cur", text: "((this.G5 * this.G6) +  (this.H5 * this.H6))-((this.G5 * this.G7) +  (this.H5 * this.H7))-((this.G5 * this.G8) +  (this.H5 * this.H8))" },
      cal_sale_y2_p2: { type: "per", text: "Math.round((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8))) / ((this.G5 * this.G6) +  (this.H5 * this.H6)) * 100 )" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "Other variable COGS", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      //D28
      cal_sale_y1_p1: { type: "cur", text: "(this.D5 * this.D11) +  (this.E5 * this.E11)" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "(this.G5 * this.G11) +  (this.H5 * this.H11)" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "Contribution margin", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "",
      sale_y2_p1: "",
      sale_y2_p2: "",
      variant: "",

      //D28
      cal_sale_y1_p1: { type: "cur", text: "((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11))" },
      cal_sale_y1_p2: { type: "per", text: "Math.round((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11))) / ((this.D5 * this.D6) +  (this.E5 * this.E6))  * 100)" },
      cal_sale_y2_p1: { type: "cur", text: "((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11))" },
      cal_sale_y2_p2: { type: "per", text: "Math.round((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11))) / ((this.G5 * this.G6) +  (this.H5 * this.H6))  * 100)" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "Fixed COGS", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "this.D16" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "this.H16" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "SG&A", input: false, percetage: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "this.D17" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "this.G17" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },

    },

    {
      name: "Depreciation, Interest, Taxes", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) - (this.D16 + this.D17))*0.21)+1000+500" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) - (this.G16 + this.G17))*0.21)+1000+500" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "AOE", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "",
      sale_y2_p1: "",
      sale_y2_p2: "",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) -  (this.D16+this.D17+((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) - (this.D16 + this.D17))*0.21)+1000+500)" },
      cal_sale_y1_p2: { type: "per", text: "Math.round((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) -  (this.D16+this.D17+((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) - (this.D16 + this.D17))*0.21)+1000+500) ) / ((this.D5 * this.D6) +  (this.E5 * this.E6))  * 100)" },
      cal_sale_y2_p1: { type: "cur", text: "((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) -  (this.G16+this.G17+((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) - (this.G16 + this.G17))*0.21)+1000+500)" },
      cal_sale_y2_p2: { type: "per", text: "Math.round((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) -  (this.G16+this.G17+((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) - (this.G16 + this.G17))*0.21)+1000+500) ) / ((this.G5 * this.G6) +  (this.H5 * this.H6))  * 100)" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "After-tax interest", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "500 * 0.79" },
      cal_sale_y1_p2: { type: "per", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "500 * 0.79" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
    {
      name: "NOPAT", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "",
      sale_y2_p1: "",
      sale_y2_p2: "",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) -  (this.D16+this.D17+((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) - (this.D16 + this.D17))*0.21)+1000+500) + 395" },
      cal_sale_y1_p2: { type: "per", text: "Math.round((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) -  (this.D16+this.D17+((((this.D5 * this.D6) +  (this.E5 * this.E6)) - ((this.D5 * this.D7) +  (this.E5 * this.E7)) - ((this.D5 * this.D8) +  (this.E5 * this.E8)) - ((this.D5 * this.D11) +  (this.E5 * this.E11)) - (this.D16 + this.D17))*0.21)+1000+500) + 395 ) /  ((this.D5 * this.D6) +  (this.E5 * this.E6))  * 100)" },
      cal_sale_y2_p1: { type: "cur", text: "((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) -  (this.G16+this.G17+((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) - (this.G16 + this.G17))*0.21)+1000+500) + 395" },
      cal_sale_y2_p2: { type: "per", text: "Math.round((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) -  (this.G16+this.G17+((((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) - (this.G16 + this.G17))*0.21)+1000+500) + 395 ) /  ((this.G5 * this.G6) +  (this.H5 * this.H6))  * 100)" },
      cal_variant: { type: "cur", text: "1000" },
    }
  ];

  balance_sheet = [
    {
      name: "Inventory", input: true,
      sale_y1_p1: "150000",
      sale_y1_p2: "empty",
      sale_y2_p1: "160000",
      sale_y2_p2: "empty",
      variant: "",
    },
    {
      name: "Accounts Receivable", input: true,
      sale_y1_p1: "110000",
      sale_y1_p2: "empty",
      sale_y2_p1: "115000",
      sale_y2_p2: "empty",
      variant: "",
    },
    {
      name: "Accounts Payable", input: true,
      sale_y1_p1: "100000",
      sale_y1_p2: "empty",
      sale_y2_p1: "105000",
      sale_y2_p2: "empty",
      variant: "",
    },
    {
      name: "Plants & equipment", input: true,
      sale_y1_p1: "250000",
      sale_y1_p2: "empty",
      sale_y2_p1: "250000",
      sale_y2_p2: "empty",
      variant: "",
    },
    {
      name: "Other", input: true,
      sale_y1_p1: "20000",
      sale_y1_p2: "empty",
      sale_y2_p1: "20000",
      sale_y2_p2: "empty",
      variant: "",
    },
    {
      name: "Invested Capital", input: false, klass: "bold",
      sale_y1_p1: "150000",
      sale_y1_p2: "empty",
      sale_y2_p1: "160000",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "cur", text: "" },
      cal_sale_y1_p2: { type: "per", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "" },
      cal_sale_y2_p2: { type: "per", text: "" },
      cal_variant: { type: "cur", text: "1000" },
    },
  ];

  roic = [
    {
      name: "NOPAT", input: false,
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",

      cal_sale_y1_p1: { type: "cur", text: "" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      variant: "empty",
    },
    {
      name: "Invested Capital", input: false,
      sale_y1_p1: "110000",
      sale_y1_p2: "empty",
      sale_y2_p1: "115000",
      sale_y2_p2: "empty",

      cal_sale_y1_p1: { type: "cur", text: "" },
      cal_sale_y1_p2: { type: "cur", text: "" },
      cal_sale_y2_p1: { type: "cur", text: "" },
      cal_sale_y2_p2: { type: "cur", text: "" },
      variant: "empty",
    },
    {
      name: "ROIC", input: false, klass: "bold",
      sale_y1_p1: "",
      sale_y1_p2: "empty",
      sale_y2_p1: "",
      sale_y2_p2: "empty",
      variant: "",

      cal_sale_y1_p1: { type: "per", text: "" },
      cal_sale_y1_p2: { type: "per", text: "" },
      cal_sale_y2_p1: { type: "per", text: "" },
      cal_sale_y2_p2: { type: "per", text: "" },
      cal_variant: { type: "cur", text: "1000" },

    }
  ];

  D5 = this.profitability[0].sale_y1_p1;
  D6 = this.profitability[1].sale_y1_p1;
  D7 = this.profitability[2].sale_y1_p1;
  D8 = this.profitability[3].sale_y1_p1;
  D11 = this.profitability[5].sale_y1_p1;
  D16 = this.profitability[8].sale_y1_p2;
  D17 = this.profitability[9].sale_y1_p2;

  D24 = this.income_statement[0].sale_y1_p1;
  D25 = this.income_statement[1].sale_y1_p1;
  D26 = this.income_statement[2].sale_y1_p1;

  E5 = this.profitability[0].sale_y1_p2;
  E6 = this.profitability[1].sale_y1_p2;
  E7 = this.profitability[2].sale_y1_p2;
  E8 = this.profitability[3].sale_y1_p2;
  E11 = this.profitability[5].sale_y1_p2;

  G5 = this.profitability[0].sale_y2_p1;
  G6 = this.profitability[1].sale_y2_p1;
  G7 = this.profitability[2].sale_y2_p1;
  G8 = this.profitability[3].sale_y2_p1;
  G11 = this.profitability[5].sale_y2_p1;
  G16 = this.profitability[8].sale_y2_p2;
  G17 = this.profitability[9].sale_y2_p2;

  H5 = this.profitability[0].sale_y2_p2;
  H6 = this.profitability[1].sale_y2_p2;
  H7 = this.profitability[2].sale_y2_p2;
  H8 = this.profitability[3].sale_y2_p2;
  H11 = this.profitability[5].sale_y2_p2;
  H16 = this.profitability[8].sale_y2_p2;

  ngAfterViewInit(): void {

    this.variant[0] = "this.income_statement[0].sale_y2_p1 - this.income_statement[0].sale_y1_p1";
    //this.getCal1("this.D24 - this.D25 - this.D26", 1, "sale_y1_p1", this.income_statement);
    /*let ab:any  = 
    (
      (
        ((this.G5 * this.G6) +  (this.H5 * this.H6)) - ((this.G5 * this.G7) +  (this.H5 * this.H7)) - ((this.G5 * this.G8) +  (this.H5 * this.H8)) - ((this.G5 * this.G11) +  (this.H5 * this.H11)) - (this.G16 + this.G17)
      )
      *0.21
    ) + 1000 + 500;*/
    setTimeout(() => {
      this.calc();
      //this.goto_step(this.step);
    }, 100)

    let reloadBtn = localStorage.getItem('reloadbtn');
    //console.log(reloadBtn);
    //if (window.performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    if (reloadBtn != 'true') {
      console.log("reload")
      this.goto_step(this.step);
    } else {
      console.log("location")
      this.showIntro = false;
      this.route.params.subscribe(params => {
        //console.log(params) //log the entire params object
        this.disableAllInput();
        this.activity = params['activity'];
        let step = params['step'];
        //setTimeout(() => {
        if (this.activity != undefined) {
          if (Number(step) != 0) {
            this.goto_step(Number(step));
          }
          this.showIntro = false;
        } else {
          this.activity = 0;
          this.showIntro = true;

        }
        //}, 2000)

      });
    }
    localStorage.setItem('reloadbtn', 'false');
    this.cdr.detectChanges();
  }
  disableAllInput() {
    console.log("disableAllInput");
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }
  }
  getCal(val, index, vari, arr) {
    if (val != undefined) {
      let cal = eval(val);
      arr[index][vari] = cal;
      //console.log(val, cal, vari)
      //return val;
      return cal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //return cal;
    }
  }

  getCal1(val, index, vari, arr) {
    if (val != undefined) {
      let cal = eval(val);
      arr[index][vari] = cal;
      console.log(val, cal, vari)
      //return val;
      return cal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //return cal;
    }
  }

  calc() {

    this.D5 = this.profitability[0].sale_y1_p1;
    this.D6 = this.profitability[1].sale_y1_p1;
    this.D7 = this.profitability[2].sale_y1_p1;
    this.D8 = this.profitability[3].sale_y1_p1;
    this.D11 = this.profitability[5].sale_y1_p1;
    this.D16 = this.profitability[8].sale_y1_p2;
    this.D17 = this.profitability[9].sale_y1_p2;

    this.D24 = this.income_statement[0].sale_y1_p1;
    this.D25 = this.income_statement[1].sale_y1_p1;
    this.D26 = this.income_statement[2].sale_y1_p1;

    this.E5 = this.profitability[0].sale_y1_p2;
    this.E6 = this.profitability[1].sale_y1_p2;
    this.E7 = this.profitability[2].sale_y1_p2;
    this.E8 = this.profitability[3].sale_y1_p2;
    this.E11 = this.profitability[5].sale_y1_p2;

    this.G5 = this.profitability[0].sale_y2_p1;
    this.G6 = this.profitability[1].sale_y2_p1;
    this.G7 = this.profitability[2].sale_y2_p1;
    this.G8 = this.profitability[3].sale_y2_p1;
    this.G11 = this.profitability[5].sale_y2_p1;
    this.G16 = this.profitability[8].sale_y2_p2;
    this.G17 = this.profitability[9].sale_y2_p2;

    this.H5 = this.profitability[0].sale_y2_p2;
    this.H6 = this.profitability[1].sale_y2_p2;
    this.H7 = this.profitability[2].sale_y2_p2;
    this.H8 = this.profitability[3].sale_y2_p2;
    this.H11 = this.profitability[5].sale_y2_p2;
    this.H16 = this.profitability[8].sale_y2_p2;

    setTimeout(() => {
      this.income_statement.forEach(element => {
        element.variant = (Number(element.sale_y2_p1) - Number(element.sale_y1_p1)).toString();
      });


      let y1 = 0;
      let y2 = 0;
      for (let i = 0; i < this.balance_sheet.length - 1; i++) {
        const element = this.balance_sheet[i];
        y1 += Number(element.sale_y1_p1);
        y2 += Number(element.sale_y2_p1);
      }

      y1 = y1 - (Number(this.balance_sheet[2].sale_y1_p1) * 2)
      y2 = y2 - (Number(this.balance_sheet[2].sale_y2_p1) * 2)

      this.balance_sheet[this.balance_sheet.length - 1].sale_y1_p1 = y1.toString();
      this.balance_sheet[this.balance_sheet.length - 1].sale_y2_p1 = y2.toString();
      //console.log(y2)
      this.balance_sheet.forEach(element => {
        element.variant = (Number(element.sale_y2_p1) - Number(element.sale_y1_p1)).toString();
      });

      this.roic[0].sale_y1_p1 = this.income_statement[this.income_statement.length - 1].sale_y1_p1;
      this.roic[0].sale_y2_p1 = this.income_statement[this.income_statement.length - 1].sale_y2_p1;
      this.roic[1].sale_y1_p1 = this.balance_sheet[this.balance_sheet.length - 1].sale_y1_p1;
      this.roic[1].sale_y2_p1 = this.balance_sheet[this.balance_sheet.length - 1].sale_y2_p1;
      setTimeout(() => {
        this.roic[2].sale_y1_p1 = Math.round((Number(this.roic[0].sale_y1_p1) / Number(this.roic[1].sale_y1_p1)) * 100).toString();
        this.roic[2].sale_y2_p1 = Math.round((Number(this.roic[0].sale_y2_p1) / Number(this.roic[1].sale_y2_p1)) * 100).toString();
        this.roic[2].variant = (Number(this.roic[2].sale_y2_p1) - Number(this.roic[2].sale_y1_p1)).toString();
      }, 10);
    }, 100)


  }

  reset() {
    //window.location.href = "#/home/" + this.activity + "/" + this.step;
    //window.location.reload()
    const uri = "home/" + this.activity + "/" + this.step;
    //this.router.onSameUrlNavigation = 'reload';
    localStorage.setItem('reloadbtn', 'true');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));

  }
  //dots = [1, 1, 1, 1, 1, 1, 1];
  activities = [
    {
      title: `ACTIVITY 1: Material Margin`,
      activity: [{
        text: `
    <p><b>Profitability components</b> are those that impact profit. We may have some control over certain components – like sales volume or prices. But others – like costs – are often determined by the market. </p>

              <p>In the Profitability Components section, you can change:</p>
              <strong>
                <ul>
                  <li>Sales Volume</li>
                  <li>Sales Price per Unit</li>
                  <li>Material Costs per Unit</li>
                  <li>Logistics Costs per Unit</li>
                  <li>Other Variable Costs per Unit</li>
                  <li>Fixed Cost of Goods Sold (COGS)</li>
                  <li>Selling, General & Administrative Expenses (SG&A)</li>
                </ul>
              </strong>
        `
      }, {
        text: `
    <p>The items in the <b>Profitability Components</b> section include sales, material costs, and logistics
                costs—the three things that affect <b>Material Margin per Unit</b>. </p>

              <p><b>Material Margin per Unit</b> helps us answer three questions:</p>
              <ul>
                <li>Did we price and purchase materials wisely?</li>
                <li>Did we manage risk well?</li>
                <li>Did we transport efficiently?</li>
              </ul>`
      },
      {
        text: `<p>The current <b>Material Margin per Unit</b> for <b>Product A</b> is $130. The calculator shows that we achieve this
        with the following input:</p>
        <table class='table' cellspacing=0 cellpadding=0>
        <tr>
          <td><b>Input</b></td>
          <td><b>Amount</b></td>
        </tr>
        <tr>
          <td>Sales Volume</td>
          <td>500 units</td>
        </tr>
        <tr>
          <td>Sales Price per Unit</td>
          <td>$500</td>
        </tr>
        <tr>
          <td>Material Costs per Unit</td>
          <td>$350</td>
        </tr>
        <tr>
          <td>Logistics Costs per Unit</td>
          <td>$20</td>
        </tr>
        </table>`
      }, {
        text:
          `<p>Suppose you double the <b>Sales Volume</b> units to 1000. Enter 1000 into the calculator. What happens to
          <b>Material Margin per Unit</b>?</p>
  <p>You should have seen that <b>Material Margin per Unit</b> stays the same, at $130. But why?</p>
  <p><b>Sales Volume</b> does not affect <b>Material Margin per Unit</b> because <b>Material Margin per Unit</b> is the
    difference
    between price and cost per unit. If price and cost stay the same, so does <b>Material Margin per Unit</b>, no
    matter how
    much of <b>Product A</b> you sold.</p>`
      },
      {
        text: `
    <p>Now suppose you were able to sell <b>Product A</b> at a higher price of $560 per unit. Enter $560 under
    <b>Product A</b> next to <b>Sales Price per Unit</b>. What happens to <b>Material Margin per Unit</b>?</p>
              <p>You should see an increase in <b>Material Margin per Unit</b> to $190 per unit. </p>`
      },
      {
        text: `
    <p>What happens if <b>Sales Price per Unit</b> decreases—for example, if demand fell slightly? Change <b>Sales Price
                per Unit</b> to $480. What do you expect to happen to the <b>Material Margin per Unit</b>?</p>
              <p>You should see it reduce to $110.</p>
              <p>Remember that <b>Logistics Costs per Unit</b> (transportation) also affects <b>Material Margin per Unit</b>. Imagine
                that the
                price of gas went up due to a pipeline shutdown. Change <b>Logistics Costs per Unit</b> to $25. What is the
                effect on <b>Material Margin per Unit</b>?</p>
              <p>You should see <b>Material Margin per Unit</b> reduce to $105. </p>`
      },
      {
        text: `
            <p>Based on your role, think about which components you can affect. For example, if you are in sales, you might be able to increase sales volume or prices.</p>
            <p>Enter other numbers in the input fields to view the effect on <b>Material Margin per Unit</b>. Think about how you can increase profitability in your role.</p>
            <p><i>Click Next to continue to <b>Activity 2: Adjusted Operating Earnings</b></i>.</p>`
      }]
    },
    {
      title: `ACTIVITY 2: Adjusted Operating Earnings `,
      activity: [{
        text: `
        <p>On the calculator, locate the <b>Income Statement Components</b> section.</p>
        <p>Note: All data in this section is output-only; you cannot change any numbers. </p>
        `
      }, {
        text: `<p>The <b>Income Statement Components</b> section aligns with the categories in the <b>Profitability Components</b> section:</p>
        <ul>
          <li><b>Sales</b></li>
          <li><b>Material costs</b></li>
          <li><b>Logistics costs</b></li>
          <li><b>Material Margin</b></li>
          <li><b>Costs of Goods Sold (COGS)</b></li>
          <li><b>Contribution Margin</b></li>
          <li><b>Selling, General & Administrative Expenses (SG&A)</b></li>
        </ul>
        <p>The difference is that in this section, the numbers represent the totals for one year rather than per unit.</p>
        
        <p>This section also includes:</p>
        <ul>
          <li><b>AOE</b></li>
          <li><b>After-tax interest</b></li>
          <li><b>NOPAT</b></li>
        </ul>`

      }, {
        text: `<p>Now let’s look at Adjusted Operating Earnings (AOE).</p>
        <p>Select <b>Reset</b> to bring the calculator values to the original amounts.</p>`
      }, {
        text: `
        <p>AOE is Organization’s “bottom line”. AOE shows us whether the company made or lost money from its commercial activities after we deduct all expenses.</p>

        <p>Several components of the income statement affect AOE, including:</p>
        
        <ul><li>Material Margin</li>
        <li>Variable and fixed costs of goods sold</li>
        <li>Expenses</li>
        <li>Interest and taxes</li>
        </ul>
        
        `
      }, {
        text: `
        <p>In the <b>Income Statement Components</b> section, the current <b>AOE</b> is $38,395. Remember that this represents AOE for an entire year of operations. </p>

        <p>In this part of the activity, you will use the <b>Profitability Components</b> section of the calculator to view changes to <b>AOE</b> in the <b>Income Statement Components</b> section.</p>
        
        <p>The calculator shows how we achieve the current <b>AOE</b> with the following inputs in the <b>Profitability Components</b> section:</p>
        <table class='table' cellspacing=0 cellpadding=0>
          <tr>
            <td><b>Input</b></td>
            <td><b>Amount</b></td>
          </tr>
          <tr>
            <td>Sales Volume</td>
            <td>500 units</td>
          </tr>
          <tr>
            <td>Sales Price per Unit</td>
            <td>$500</td>
          </tr>
          <tr>
            <td>Material Costs per Unit	$350</td>
            <td>$350</td>
          </tr>
          <tr>
            <td>Logistics Costs per Unit</td>
            <td>$20</td>
          </tr>
        </table>
        `
      }, {
        text: `
        <p>In the <b>Profitability Components</b> section, locate <b>Material Costs per Unit</b> and <b>Material Margin per Unit</b>.</p>

        <p>You will find the following amounts:</p>
        <table class='table' cellspacing=0 cellpadding=0>
          <tr>
            <td><b>Component</b></td>
            <td><b>Amount</b></td>
          </tr>
          <tr>
            <td>Material Costs per Unit</td>
            <td>$350</td>
          </tr>
          <tr>
            <td>Material Margin per Unit</td>
            <td>$130</td>
          </tr>
        </table>
        `
      }, {
        text: `
        <p>Suppose you negotiate favorable terms with a supplier and purchase materials for <b>Product A</b> for $325 per unit.</p>
        <p>In the <b>Profitability Components</b> section, enter $325 into the <b>Material Costs per Unit</b> field under <b>Product A</b>.</p>
        <p><b>Material Margin per Unit</b>, as you may have predicted, increased. It is now $155 per unit.</p>
        <p>Since Material Margin directly affects AOE, what effect do you think increasing <b>Material Margin per Unit</b> on the same volume had on <b>AOE</b>?</p>
        `
      }, {
        text: `
        <p>Look at <b>AOE</b> in the <b>Income Statement Components</b> section. It was $38,395, as you noted earlier. But <b>AOE</b> increased to $48,270. </p>
        <p>When you can reduce Organization’s costs for a product, you make a positive effect on <b>AOE</b>. </p>
        `
      }, {
        text: `
        <p>Now suppose demand for <b>Product A</b> decreases throughout the country. Your customers are less willing to pay the higher price since they can look elsewhere. As a result, you agree on a selling price of $450 per unit. </p>

        <p>Look back at the <b>Sales Price per Unit</b> field under <b>Product A</b> in the <b>Profitability Components</b> section. Change it to $450.</p>
        
        <p>Then look at <b>AOE</b> again in the <b>Income Statement Components</b> section. What happened to <b>AOE</b>?</p>
        
        <p>You will notice that it decreased to $28,520.  </p>
        `
      }, {
        text: `
        <p>It is important to focus on what we can control to drive consistent profitable growth. To impact AOE, you can:</p>
        <ul>
          <li>Drive consistent organic growth.</li>
          <li>Be disciplined with expenses.</li>
          <li>Execute inorganic investments effectively.</li>
        </ul>
        <p><i>Select Next to continue to <b>Activity 3: Balance Sheet Components</b>.</i></p>
        `
      }]
    },
    {
      title: `ACTIVITY 3: Balance Sheet Components `,
      activity: [{
        text: `
        <p>On the calculator, locate the <b>Balance Sheet Components</b> section.</p>

        <p>These components are the variables that affect Invested Capital. In this section, you can change:</p>
        <ul>
          <li><b>Inventory</b></li>
          <li><b>Accounts Receivable</b></li>
          <li><b>Accounts Payable</b></li>
          <li><b>Plants & equipment</b></li>
          <li><b>Other</b> (items not included above)</li>
        </ul>
        <p>In this activity, we’ll focus on values under <b>Year 1</b>.</p>
        <p>Components of the balance sheet are needed to calculate Invested Capital. Invested Capital tells Organization how much money it has invested.</p>
        `
      },
      {
        text: `
      <p>The current <b>Invested Capital</b> under <b>Year 1</b> is $430,000. The calculator shows that we achieve this with the following input:</p>
      <table class='table' cellspacing=0 cellpadding=0>
          <tr>
            <td><b>Input</b></td>
            <td><b>Amount</b></td>
          </tr>
          <tr>
            <td>Inventory</td>
            <td>$150,000</td>
          </tr>
          <tr>
            <td>Accounts Receivable</td>
            <td>$110,000</td>
          </tr>
          <tr>
            <td>Accounts Payable</td>
            <td>$100,000</td>
          </tr>
          <tr>
            <td>Plants & equipment</td>
            <td>	$250,000</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>$20,000</td>
          </tr>
      </table>
    `
      },
      {
        text: `
      <p>Suppose Organization’s inventory doubles to $300,000. Locate <b>Inventory</b> in the <b>Balance Sheet Components</b> section. Change it to $300,000.</p>

      <p>What happens to <b>Invested Capital</b>?</p>
      
      <p>You should have seen that <b>Invested Capital</b> increases to $580,000. Why?</p>
      
      <p>Inventory is an asset, so it is part of Organization’s Invested Capital.</p>
      `
      },
      {
        text: `
      <p>Now suppose Organization extended credit terms to more customers, and as a result, more customers purchased products this year. Organization’s <b>Accounts Receivable</b> went up to $250,000.</p>

      <p>Locate <b>Accounts Receivable</b> in the <b>Balance Sheet Components</b> section. </p>

      <p>Enter $250,000 under <b>Year 1</b> next to <b>Accounts Receivable</b>.</p>

      <p>What happens to <b>Invested Capital</b>?</p>

      <p>Notice that it increased to $720,000.</p>
    `
      },
      {
        text: `
      <p>What do you think would happen to <b>Invested Capital</b> if Organization reduced its inventory?</p>
      <p>Enter a value in <b>Inventory</b> less than the current value to find out.</p>
      `
      },
      {
        text: `
      <p>Based on your role, which components can you affect?  </p>
      <p>Enter other numbers in the input fields to view the effect on <b>Invested Capital</b>. </p>
      <p><i>Select Next to continue to <b>Activity 4: ROIC</b>.</i></p>
      `
      }]
    },
    {
      title: `ACTIVITY 4: ROIC  `,
      activity: [
        {
          text: `
      <p>Select <b>Reset</b> on the calculator to reset the values to their original amounts.</p>

      <p>ROIC is the return we make on our investment. ROIC tells us if we made good decisions about where and how we invested our resources. ROIC is measured as a percentage.</p>

      <p>Invested Capital, along with Net Operating Profit After Tax (NOPAT), directly affects Return on Invested Capital (ROIC). </p>
      <ul>
        <li>Invested capital tells us how much money we invested. </li>
        <li>NOPAT tells us how Organization generated profit.</li>
      </ul>`
        },
        {
          text: `
      <p>Locate the <b>ROIC</b> section of the calculator. </p>
      <p>Note: All data in this section is output-only; you cannot change any numbers. </p>
      <p>The current amounts in the calculator are:</p>
      <table class='table' cellspacing=0 cellpadding=0>
        <tr>
          <td><b>Component</b></td>
          <td><b>Amount</b></td>
        </tr>
        <tr>
          <td>NOPAT</td>
          <td>$38,790</td>
        </tr>
        <tr>
          <td>Invested Capital</td>
          <td>$430,000</td>
        </tr>
        <tr>
          <td>ROIC</td>
          <td>9%</td>
        </tr>
      </table>

      <p>These represent the calculations for the entire year.</p>

      <p>To calculate <b>NOPAT</b>, we add after-tax interest to AOE.</p>

      `
        },
        {
          text: `
      <p>Locate <b>AOE</b> and <b>NOPAT</b> in the <b>Income Statement Components</b> section of the calculator. The current value for <b>AOE</b> is $38,395.</p>
      <p>If <b>AOE</b> increases, what would you expect to happen to <b>NOPAT</b>?</p>
      `
        },
        {
          text: `<p>To find out, let’s use the calculator to change <b>AOE</b>. We’ll adjust <b>Sales Price per Unit</b> for this example.</p>`
        },
        {
          text: `
      <p>Locate <b>Sales Price per Unit</b> in the <b>Profitability Components</b> section. Change it to $550, because you want to see an increase to <b>AOE</b>.</p>

      <p>Now locate <b>AOE</b> in the <b>Income Statement Components</b> section. You will notice that it increased to $58,145.</p>
      `
        },
        {
          text: `
      <p>Now locate <b>NOPAT</b> in the <b>ROIC</b> section. <b>NOPAT</b> was $38,790. What happened to <b>NOPAT</b> after you changed the <b>Sales Price per Unit</b> to affect <b>AOE</b>?</p>
      <p>You will notice that it increased to $58,540.</p>
      `
        },
        {
          text: `
      <p>Staying in the <b>ROIC</b> section, what effect did increasing <b>AOE</b> have on <b>ROIC</b>?</p>
      <p><b>ROIC</b> is now 14%.</p>
      `
        },
        {
          text: `
      <p>Locate <b>Inventory</b> in the <b>Balance Sheet Components</b> section. Change <b>Inventory</b> to $50,000.</p>
      <p>Now scroll back to <b>ROIC</b> section. </p>
      <p>What effect does reducing <b>Inventory</b> have on <b>ROIC</b>? Why?</p>
      <p>Decreasing <b>Inventory</b> also decreases <b>Invested Capital</b>. Since <b>ROIC</b> is <b>NOPAT</b> divided by <b>Invested Capital</b>, a decrease in <b>Invested Capital</b> increases <b>ROIC</b>.</p>
      <p>What effect does increasing <b>Accounts Receivable</b> have on <b>ROIC</b>? Enter some of your own values into the calculator to find out.</p>
      `
        },
        {
          text: `<p>Based on your role, what components might you be able to affect in order to increase ROIC?</p>
          <p>Enter other numbers into the input fields to view the effect on <b>ROIC</b>.</p>
          <p><i>Click Menu to review any of the other activities.</i></p>
          <p><i>Exit the window if you are finished with this exercise.</i></p>`
        }]
    }
  ];
  gotoActivity(i) {
    this.activity = i;
    this.goto_step(0);
    this.showMenu = false;
  }
  goto_step(i) {
    this.disableAllInput();
    if (this.activity == 0) {
      this.activity1_step(i)
    } else if (this.activity == 1) {
      this.activity2_step(i)
    } else if (this.activity == 2) {
      this.activity3_step(i)
    } else if (this.activity == 3) {
      this.activity4_step(i)
    }

  }

  activity1_step(i) {
    this.step = i;

    let sales_volume_txt = this.inputOp("prof_a_0")
    /*let sales_volume_txt = <HTMLInputElement>document.getElementById("prof_a_0");

    if (sales_volume_txt)
      sales_volume_txt.disabled = true;*/
    let sales_per_unit = this.inputOp("prof_a_1")
    /*let sales_per_unit = <HTMLInputElement>document.getElementById("prof_a_1");
    console.log(sales_per_unit);
    //if (sales_per_unit)
      sales_per_unit.disabled = true;*/

    let logistic_cost = this.inputOp("prof_a_3")
    /*<HTMLInputElement>document.getElementById("prof_a_3");
    //if (logistic_cost)
    logistic_cost.disabled = true;*/
    let mm_per_unit = document.getElementById("prof_curr_a_4");

    sales_volume_txt.parentElement.classList.remove("active");
    sales_volume_txt.parentElement.parentElement.parentElement.classList.remove("highlight_row");

    sales_per_unit.parentElement.classList.remove("active");
    sales_per_unit.parentElement.parentElement.parentElement.classList.remove("highlight_row");

    logistic_cost.parentElement.classList.remove("active");
    logistic_cost.parentElement.parentElement.parentElement.classList.remove("highlight_row");
    mm_per_unit.classList.remove("highlight");




    switch (this.step) {
      case 3:
        console.log("activity1_step ", 3)
        this.inputActive(sales_volume_txt);
        //sales_volume_txt.parentElement.classList.add("active");
        //sales_volume_txt.parentElement.parentElement.parentElement.classList.add("highlight_row");
        //mm_per_unit.classList.add("highlight");
        //sales_volume_txt.disabled = false;

        //sales_volume_txt.removeAttribute('disabled')
        //console.log(sales_volume_txt)
        //sales_volume_txt.focus();
        break;
      case 4:
        sales_per_unit.classList.add("active");
        sales_per_unit.parentElement.parentElement.parentElement.classList.add("highlight_row");
        // mm_per_unit.classList.add("highlight");
        sales_per_unit.disabled = false;
        sales_per_unit.focus();
        break;
      case 5:
        sales_per_unit.parentElement.classList.add("active");
        sales_per_unit.parentElement.parentElement.parentElement.classList.add("highlight_row");
        sales_per_unit.disabled = false;
        sales_per_unit.focus();

        logistic_cost.parentElement.classList.add("active");
        logistic_cost.parentElement.parentElement.parentElement.classList.add("highlight_row");
        logistic_cost.disabled = false;
        //logistic_cost.focus();

        //mm_per_unit.classList.add("highlight");
        break;
      case 6:
        let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].disabled = false;
        }
        break;

      default:
        break;
    }
  }
  activity2_step(i) {
    this.step = i;
    let mc_per_unit = this.inputOp("prof_a_2");
    let mm_per_unit = document.getElementById("prof_curr_a_4");
    mm_per_unit.classList.remove("highlight");

    let aoe = document.getElementById("aoe_a_9");
    aoe.classList.remove("highlight");

    let sale_per_unit = this.inputOp("prof_a_1");

    switch (this.step) {
      case 0:
        console.log(localStorage.getItem('reloadbtn'));
        //if(localStorage.getItem('reloadbtn') == 'true'){
        this.reset();
        //}
        //
        break;
      case 6:
        this.inputActive(mc_per_unit);
        //mm_per_unit.parentElement.parentElement.parentElement.classList.add("highlight_row");
        break;
      case 7:
        if (this.income_statement[9].sale_y1_p1 == "48270") {
          this.scrollTo('income_table');
          aoe.classList.add("highlight");
        }
        //mm_per_unit.parentElement.parentElement.parentElement.classList.add("highlight_row");
        break;
      case 8:
        this.scrollTo('prof_table');

        this.inputActive(sale_per_unit);
        break;
      default:
        break;
    }
  }

  activity3_step(i) {
    this.step = i;
    let invest_cap = document.getElementById("bal_a_5");
    invest_cap.classList.remove("highlight");

    let inventory = this.inputOp("bal_a_0");
    inventory.classList.remove("highlight");

    let accounts_rec = this.inputOp("bal_a_1");

    switch (this.step) {
      case 1:
        this.scrollTo('balance_table');
        invest_cap.classList.add("highlight");
        break;
      case 2:
        this.inputActive(inventory);
        break;
      case 3:
        this.inputActive(accounts_rec);
        break;

      case 4:
        this.inputActive(inventory);
        break;
      case 5:
        let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].disabled = false;
        }
        break;
      default:
        break;
    }
  }


  activity4_step(i) {
    this.step = i;
    let aoe = document.getElementById("aoe_a_9");
    aoe.classList.remove("highlight");

    //let sales_per_unit = <HTMLInputElement>document.getElementById("prof_a_1");
    let sales_per_unit = this.inputOp("prof_a_1");
    let NOPAT = document.getElementById("aoe_a_11");
    NOPAT.classList.remove("highlight");

    let ROIC = document.getElementById("roic_a_2");
    ROIC.classList.remove("highlight");

    let inventory = this.inputOp("bal_a_0");
    inventory.classList.remove("highlight");

    switch (this.step) {
      case 0:
        this.reset();
        break;
      case 1:
        this.scrollTo('roic_table');
        break;
      case 2:
        this.scrollTo('income_table');
        aoe.classList.add("highlight");
        break;
      case 4:
        this.scrollTo('prof_table');

        this.inputActive(sales_per_unit);
        break;
      case 5:
        NOPAT.classList.add("highlight");
        break;

      case 6:
        this.scrollTo('roic_table');
        ROIC.classList.add("highlight");
        break;
      case 7:
        this.inputActive(inventory);
        break;
      case 8:
        let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].disabled = false;
        }
        break;
      default:
        break;
    }
  }

  inputOp(ip) {
    let input_feild = <HTMLInputElement>document.getElementById(ip);
    input_feild.parentElement.classList.remove("active");
    input_feild.parentElement.parentElement.parentElement.classList.remove("highlight_row");
    input_feild.disabled = true;
    return input_feild;
  }
  inputActive(ip) {
    ip.parentElement.classList.add("active");
    ip.parentElement.parentElement.parentElement.classList.add("highlight_row");
    ip.disabled = false;
    ip.focus();
  }
  checkValue() {
    if (this.activity == 0) {
      this.checkInputValue1(this.activity);
    } else if (this.activity == 1) {
      this.checkInputValue2(this.activity);
    } else if (this.activity == 2) {
      this.checkInputValue3(this.activity);
    } else if (this.activity == 3) {
      this.checkInputValue4(this.activity);
    }

  }

  checkInputValue1(i) {
    let mm_per_unit = document.getElementById("prof_curr_a_4");
    mm_per_unit.classList.remove("highlight");
    switch (this.step) {
      case 3:
        //sales volume
        if (this.profitability[0].sale_y1_p1 == 1000) {
          mm_per_unit.classList.add("highlight");
        }
        //console.log(this.profitability[0].sale_y1_p1)
        break;

      case 4:
        //sales volume
        if (this.profitability[1].sale_y1_p1 == 560) {
          mm_per_unit.classList.add("highlight");
        }
        break;
      case 5:
        //sales volume
        let currentInput = (document.activeElement as HTMLInputElement);
        currentInput.addEventListener("change", function () {
          mm_per_unit.classList.remove("highlight");
        })
        setTimeout(() => {
          if (this.profitability[1].sale_y1_p1 == 480
            && currentInput.value == "480"
            && this.profitability[4].sale_y1_p1 == 110) {
            mm_per_unit.classList.add("highlight");
          }
          if (this.profitability[3].sale_y1_p1 == 25
            && currentInput.value == "25"
            && this.profitability[4].sale_y1_p1 == 105) {
            mm_per_unit.classList.add("highlight");
          }
        }, 100);
        break;
      default:
        break;
    }

  }

  checkInputValue2(i) {
    let mm_per_unit = document.getElementById("prof_curr_a_4");
    mm_per_unit.classList.remove("highlight");
    let aoe = document.getElementById("aoe_a_9");
    aoe.classList.remove("highlight");

    switch (this.step) {
      case 6:
        if (this.profitability[2].sale_y1_p1 == 325) {
          mm_per_unit.classList.add("highlight");
        }
        break;

      case 8:
        if (this.profitability[1].sale_y1_p1 == 450) {
          aoe.classList.add("highlight");
          this.scrollTo('income_table');
        }
        break;
      default:
        break;
    }
  }

  checkInputValue3(i) {
    let investment = document.getElementById("bal_a_5");
    investment.classList.remove("highlight");
    //let aoe = document.getElementById("aoe_a_9");
    //aoe.classList.remove("highlight");

    switch (this.step) {
      case 2:
        console.log(this.balance_sheet[0].sale_y1_p1)
        if (this.balance_sheet[0].sale_y1_p1 == "300000") {
          investment.classList.add("highlight");
        }
        break;

      case 3:
        console.log(this.balance_sheet[0].sale_y1_p1)
        if (this.balance_sheet[1].sale_y1_p1 == "250000") {
          investment.classList.add("highlight");
        }
        break;
      default:
        break;
    }
  }

  checkInputValue4(i) {
    let aoe = document.getElementById("aoe_a_9");
    aoe.classList.remove("highlight");
    let sales_per_unit = <HTMLInputElement>document.getElementById("prof_a_1");
    let inventory = <HTMLInputElement>document.getElementById("bal_a_0");
    switch (this.step) {
      case 4:
        console.log(this.profitability[1].sale_y1_p1)
        if (this.profitability[1].sale_y1_p1 == "550") {
          sales_per_unit.blur();

          setTimeout(() => {
            this.scrollTo('income_table')
            aoe.classList.add("highlight");
          }, 100)

        }
        break;
      case 7:
        console.log(this.balance_sheet[0].sale_y1_p1)
        if (this.balance_sheet[0].sale_y1_p1 == "50000") {
          inventory.blur();

          setTimeout(() => {
            //this.scrollTo('income_table')
            aoe.classList.add("highlight");
          }, 100)

        }
        break;
      case 8:

        break;
      default:
        break;
    }
  }

  scrollTo(id) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }

  prev() {
    this.step--;
    if (this.step == -1) {
      this.activity--;
      this.step = this.activities[this.activity].activity.length - 1
    }
    this.goto_step(this.step)
  }
  next() {
    this.step++;
    if (this.step == this.activities[this.activity].activity.length) {
      this.activity++;
      this.step = 0;
    }
    this.goto_step(this.step)
  }
}
