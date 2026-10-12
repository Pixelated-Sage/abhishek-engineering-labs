#include <iostream>

struct Node{
    int data;
    Node* next;

    Node(int val):data(val),next(nullptr){}
};

int main(){
    Node* first = new Node(10);
    Node* second = new Node(20);
    Node* third = new Node(30);


    Node* head = first;

    first->next = second;
    second->next = third;
    third->next = nullptr;


    Node* temp = head;
    while(temp!= nullptr){
        std::cout<<temp->data<<" -> ";
        temp= temp-> next;
    }
    std::cout<< "NULL"<<std::endl;

    delete first;
    delete second;
    delete third;
    return 0;
    
}