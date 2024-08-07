#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Person {
    public:
    string name;
    int age;
    int weight;
    friend std::ostream& operator<<(std::ostream& stream, const Person& p);
};

class Counter {
    public:
    void increment(int value);
    double get();
};

class SumCounter : public Counter { 
public:
    double total = 0;
    int size = 0;
    void increment(int value) {
        size++;
        total += value;
    }

    double get() {
        return total;
    }
};

class RunningAvg : public Counter {
    public:
    double avg;
    int size;
    RunningAvg() {
        avg = 0;
        size = 0;
    }
    //   avg_n = (x1 + x2 + x3 + ... xn) / n
    // # avg_n+1 = (x1 + x2 + x3 + ... + xn + xn+1) / n+1
    // # avg_n+1 * (n+1) = (x1 + x2 + x3 + ... + xn + xn+1)
    // # avg_n+1 * n + avg_n+1 - xn+1 = (x1 + x2 + x3 + .. + xn)
    // # avg_n+1 +avg_n+1 / n - xn+1 / n = (x1 + ... + xn) / n
    // # 2avg_n+1 / n = (avg_n + (x_n+1 / n))
    // # avg_n+1 = n/2(avg_n + x_n+1/n)
    void increment(int value) {
        if (size == 0) {
            size++;
            avg = value;
        } else {
            avg = (size*1.0/2) * (avg + (value / size));
            size++;
        }
    }

    double get() {
        return avg;
    }
};

template <typename T>
class PersonCounter {
    public:
        unordered_map<string, T*> personToCounter;
        void add(string name, int value) {
            if (personToCounter.count(name)) {
                personToCounter[name]->increment(value);
            } else {
                personToCounter[name] = new T();
                personToCounter[name]->increment(value);
            }
        }

        friend ostream& operator<<(ostream& stream, PersonCounter<T> p) {
            for (auto& [k, v] : p.personToCounter) {
                stream << "Name: " << k << ", Value: " << v->get();
            }
            return stream;
        }
};

vector<string> split(string instring, string split) {
    vector<string> splits;
    int splitSize = split.size();
    string token = "";
    for(int i = 0; i < instring.size(); i++) {
        if (i + splitSize < instring.size()) {
            if (instring.substr(i, splitSize) == split) {
                i = i + splitSize - 1;
                splits.push_back(token);
                token = "";
                continue;
            }
        }
        token += instring[i];
    }
    if (token.size() > 0) {
        splits.push_back(token);
    }
    return splits;
}

typedef PersonCounter<RunningAvg> PersonAvgCounter;
typedef PersonCounter<SumCounter> PersonSumCounter;

std::ostream& operator<< (std::ostream& stream, const Person& p) {
    stream << p.name << ", " << p.age;
    return stream;
}

void personCounterDriver() {
    PersonAvgCounter pavg;
    PersonSumCounter psum;
    bool exit = false;
    int i = 0;
    Person p;
    while(!exit) {
        string token;
        if (i % 3 == 0) {
            cout << "Enter name: " << endl;
        } else if (i % 3 == 1) {
            cout << "Enter age: " << endl;
        } else {
            cout << "Enter weight: " << endl;
        }
        cin >> token;
        if (token == "exit") {
            exit = true;
        } else {
            if (i % 3 == 0) {
                p.name = token;
            } else if (i % 3 == 1) {
                p.age = atoi(token.c_str());
                pavg.add(p.name, p.age);
            } else if (i % 3 == 2) {
                p.weight = atoi(token.c_str()); 
                psum.add(p.name, p.weight);
                p = Person();
            }
            i++;
        }
    }
    cout << pavg << endl;
    cout << psum << endl;
}

int main(int argc, char ** argv) {
    ios::sync_with_stdio();
    cin.tie(0);
    auto splits = split("test;splitting;blah", ";");
    for(string& t : splits) {
        cout << t << ", " << endl;
    }
    // personCounterDriver();

    return 0;
    
}