#include <stdio.h>
#include <functional>
#include <mutex>
#include <thread>

using namespace std;

class SyncInt {
    public:
    mutex mut;
    int* lastUpdated = new int(0);
    void update
};

class Foo {
public:
    SyncInt lastUpdated_;
    Foo() {

    }
    
    void printFirst() {
        printf("%s", "first");
    }
    void printSecond() {
        printf("%s", "second");
    }
    void printThird() {
        printf("%s", "third");
    }

    void first(function<void()> printFirst) {
        lock_guard<mutex> guard(lastUpdated_.mut);
        if (*lastUpdated_.update == 0) {
            // printFirst() outputs "first". Do not change or remove this line.
            printFirst();
            *lastUpdated_.update = 1;
        }
    }

    void second(function<void()> printSecond) {
        // printSecond() outputs "second". Do not change or remove this line.
        lock_guard<mutex> guard(lastUpdated_.mut);
        if (*lastUpdated_.update == 1) {
            printSecond();
            *lastUpdated_.update = 2;
        }
    }

    void third(function<void()> printThird) {
        lock_guard<mutex> guard(lastUpdated_.mut);
        if (*lastUpdated_.update == 2) {
        // printThird() outputs "third". Do not change or remove this line.
            printThird();
            *lastUpdated_.update = 3;
        }
    }
};