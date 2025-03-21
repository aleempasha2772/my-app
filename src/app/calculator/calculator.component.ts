import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  display:string='0';
  display1:string ='0';
  appendToDisplay(value :string ):void{
    if(this.display==='0'&& value!=='.'){
      this.display = value;
    }else{
      this.display +=value
    }
  }
  calculate():void{
    try{
      const expression = this.display;
      const tokens =expression.match(/(\d*\.?\d+|[+\-*/])/g); // Split into numbers and operators
      if (!tokens) throw new Error('Invalid expression');
      let result = parseFloat(tokens[0]) 

      for(let i=1;i<tokens.length; i += 2){
        const operator = tokens[i];
        const nextNum = parseFloat(tokens[i+1])
        switch(operator){
          case '+': result += nextNum; break;
          case '-': result -= nextNum; break;
          case '*': result *= nextNum; break;
          case '/': 
            if (nextNum === 0) throw new Error('Division by zero');
            result /= nextNum; 
            break;
        }
      }
      this.display = result.toString();
      this.display1 = this.display
    }catch(error){
      console.log(error)
      this.display = 'Error'
    }
  }

  
  clear():void{
    this.display='0';
  }
}
