#include <iostream>
#include <string>

#define MAX 100 

class stack{
    private:
    int top;
    char arr[MAX];

    public:
    stack(){
        top=-1;
    }
    bool push (char value){
        if(top>= (MAX-1)){
            std::cout<<"Stack is already full";
            return false;
        }
        arr[++top] = value;
        return true;
    }
    char pop (){
        if(top<0){
            std::cout<<"Stack is already empty";
            return ' ';
        }
        char value = arr[top--];
        return value;
    }
    bool isempty(){
        return (top<0);
    }
};


int main(){
    std::string name = "Abhishek";
    stack s;
    for(char c: name){
        s.push(c);
    }
    int i = 0;
    bool isPalindrome= true;
    while(!s.isempty()){
        char value = s.pop();
        i++;
        if(!value == (name.length() -i) ){
            isPalindrome = false;
            std::cout<<"Not a plindrome";
            break;
        }
        std::cout<<value;
    }
    std::cout<<isPalindrome;
    
}