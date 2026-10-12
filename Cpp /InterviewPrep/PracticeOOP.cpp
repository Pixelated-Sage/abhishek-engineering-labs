#include <iostream>
#include <string>


class player {
    private:
    std::string brand;
    int year;
    public:
    player(std::string b, int y) : brand(b), year(y) {}

    
    player(const player &source) : brand(source.brand), year(source.year) {
        std::cout<<"Copy constructor called!"<<std::endl;
    }

    void display(){
        std::cout<<brand<<" is "<<year<<std::endl;
    }
};

int main(){
    player p1("toyota", 56);
    player p2 = p1;
    p1.display();
    p2.display();

}