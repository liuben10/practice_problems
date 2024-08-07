#include <sstream>
#include <vector>
#include <iostream>

using namespace std;

void testSplit() {
    string bar = "hello world blah";
    stringstream bars = stringstream(bar);
    vector<string> s;
    string current;
    for(int i = 0; i < bar.size(); i++) {
        if (bar[i] == ' ') {
            s.push_back(current);
            current = "";
            continue;
        }
        current += bar[i];
    }
    if (!current.empty()) {
        s.push_back(current);
    }
    for(string si : s) {
        cout << si << ", ";
    }
    cout << endl;
}
int main() {
    testSplit();
}