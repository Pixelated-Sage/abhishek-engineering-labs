#include <iostream>
#include <string>
#include <cctype>


void insert1D(int arr[], int &size, int capacity, int element , int index);

int main(){
    int score  = 100; // 4byte
    double temperature = 36.0; // 8byte
    char currency = '$';  // 1byte
    bool gamingRunning = false;  // 1byte
    std::string message = "Game Over";  //dynamic

    std::cout<<"Score: " << score << std::endl;
    std::cout<<"Temperature: "<< temperature << std::endl;

    std::string value;

    std::cout<<"Enter your name: ";
    std::getline(std::cin,value);
    std::cout<<"Your value is "<< value<<std::endl;

    for (char &c:value){
        c = std::tolower(c);
    }
    std::cout<<value<<std::endl;

    if(value == "abhishek sharma"){
        std::cout<<"its Abhishek your age is 21"<<std::endl;
    } else if (value == "vaibhav sharma"){
        std::cout<<"its Vaibhav your age is 21 too"<<std::endl;
    }else {
        std::cout<<"invalid name"<<std::endl;
    }

    for(int i = 0; i<=5;i++){
        std::cout<<"Iteration: "<<i<<std::endl;
    }


    int* ptr = &score;
     
    *ptr = 20;

    std::cout<<ptr<<*ptr<<score<<std::endl;


    int arr[10] = {10,20,30};
    for(int c:arr){
        std::cout<<c;
    }
    int arr2[3][3]= {
        {10,20,30},
        {40,50,60},
        {70,80,90}
    };

    for(auto &c:arr2){
        for(int d: c){
            std::cout<<d<<", ";
        }
        std::cout<<std::endl;
    }
    int size = 3;
    insert1D(arr,size,10,99,1);
    for(int c:arr){
        std::cout<<c;
    }
    return 0;

}

void insert1D(int arr[], int &size, int capacity, int element , int index){
    if (index<0 || index>=size || size >= capacity) return;
    for (int i = size; i>index;i--){
        arr[i] = arr[i-1];
    }
    arr[index] = element;
    size++;

}
