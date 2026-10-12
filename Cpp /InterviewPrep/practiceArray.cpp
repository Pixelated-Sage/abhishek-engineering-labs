#include <iostream>

int main(){
    // reverse an array

    int arr[10] = {10,20,30,40,50,60,70,80,90,100};
    int size = sizeof(arr)/sizeof(arr[1]);
    int semiarr = size -1;
    for(int i = 0 ; i<size; i++){
        int* a = &arr[i];
        int* b = &arr[size-1-i];
        if(i<=size-1-i){
            std::cout<<*a<<" , "<<*b<<std::endl;
            // int temp = *a;
            // *a = *b;
            // *b = temp;
            *a ^= *b ^= *a ^=*b;
        }else {
            break;
        }
    }
    int arr1[5] = {10,10,30,20,2};
    int max = 0;
    int max2 = 0;
    int min = 9999;
    int min2;
    for (int c: arr1){
        if(c>max){
            max2 = max;
            max = c;
        }
        if(c<min){
            min2 = min;
            min = c;
        }
    }

    std::cout<<min<<" , "<<min2<<" , "<<max<<" , "<<max2<<std::endl;

    int arr3[9] = {10,10,10,20,30,40,40,40,50};
    int freq[9] = {0};
    int count = 0;
    int length = sizeof(arr3)/sizeof(arr[0]);
    for(int i = 0 ; i < length;i++){
        for(int j = i+1 ; j <length;j++){
            if(arr3[i]==arr3[j]){
                count++;
                int* fr = &freq[i]; 
               int* v = &arr3[j];
               *v = 0; 
               *fr = count;
            }
        }
        count = 0;
    }

    for(int c : arr3){
        std::cout<<c<<" , ";
    }
    std::cout<<std::endl;
    for(int c : freq){
        std::cout<<c<<" , ";
    }
    std::cout<<std::endl;
    for(int c: arr){
        std::cout<<c<<" , ";
    }


    // sorting 

    int arr4[10] = {8,5,3,6,3,6,3,7,3,1};
    int target = 11;
    int size1 = sizeof(arr4)/sizeof(arr4[0]);
    for(int i = 0 ; i < size1; i++ ){
        for(int j = i; j<size1;j++){
            if((arr4[i]+arr4[j]) == target){
                std::cout<<arr4[i]<<"+"<<arr4[j]<<"="<<target<<std::endl;
            }
        }

    }
    



    int arr5[10]= {1,2,3,4,5,6,7,8,9,10};
    int left = 0 ;
    int right = size;
    int target1 = 8;
    while(left<right){
        int middle = (left - right)/2;
        std::cout<<arr5[middle]<<middle<<right<<left<<std::endl;
        if(arr5[middle]== target1){
            right = right - (middle -1);
        }else if (arr5[middle]<target1){
            left = left+(middle+1);
        }else if (arr5[middle]>target1){
            std::cout<<"found"<<arr[middle]<<std::endl;
            break;
        }
    }
}