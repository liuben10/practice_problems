#include <math.h>
#include <vector>
#include <list>
#include <unordered_map>
#include <iostream>
#include <cstdlib>

using namespace std;


class RandomizedSet {
public:
    typedef unordered_map<int, list<int>::iterator>::iterator cachePositionIterator;
    typedef unordered_map<int, cachePositionIterator>::iterator randomLookupMapIterator;
    list<int> buf;
    unordered_map<int, list<int>::iterator> cache;
    unordered_map<int, cachePositionIterator> randomLookupMap;
    unordered_map<int, randomLookupMapIterator> randomLookupPositionMap;
    int head;
    int end;

    RandomizedSet() : cache(), buf(), randomLookupMap(), randomLookupPositionMap(), head(0), end(0) {
    }
    void printCache() {
        cout << "-- cache it state --" << endl;
        for(auto cacheIt : cache) {
            cout << cacheIt.first << ", " << *cacheIt.second << endl;
        }
        cout << endl;
    }
    void printRandomLookupMap() {
        cout << "-- random lookup state -- " << endl;
        for (auto randomLookupIt : randomLookupMap) {
            cout << randomLookupIt.first << ", " << randomLookupIt.second->first << endl;
        }
        cout << endl;
    }
    void printRandomLookupPositionMap() {
        cout << "-- random position state -- " << endl;
        for (auto randomLookupPositionIt : randomLookupPositionMap) {
            cout << randomLookupPositionIt.first << ", " << randomLookupPositionIt.second->first << endl;
        }
        cout << endl;
    }

    void printState() {
        printCache();
        printRandomLookupMap();
        printRandomLookupPositionMap();
    }

    bool insert(int val) {
        // cout << "Insert called" << endl;
        // --insert needs to happen in o(1) time.
        // --inserting at the end of a list is o(1) time so we can always just insert elements at the end of our list
        // --inserting into a map takes o(1) time.
        // we can check if an element exists in our RandomSet cache in o(1) time by checking if the cache contains the element in our cache in o(1) time.
         // if it does, contain the element, return false as the element was present
        // if the element does not exist in our RandomSet cache,
            // we push_back the element onto our list.
            // cacheInsertionIterator <-- we record a pair of (end, buf.end()). We then immediately find the iterator of the stored at location.
            // randomLookupMapPosition <-- we record a pair (end, cacheInsertionIterator) in our random lookup map. We immediately find an iterator of the element to the randomLookupMap iterator associated.
            // we record a pair (element, randomLookupMapPosition) in our randomLookupPositionMap.
            // we increment end.
        if (cache.find(val) != cache.end()) {
            return false;
        } 
        buf.push_back(val);
        auto lastIt = --buf.end();
        cache.insert({val,lastIt});
        auto cacheInsertionIterator = cache.find(val);
        randomLookupMap.insert({end, cacheInsertionIterator});
        auto randomLookupMapPositionIterator = randomLookupMap.find(end);
        randomLookupPositionMap.insert({val, randomLookupMapPositionIterator});
        end++;
        // printState();
        return true;
    }
    
    bool remove(int val) {
        // cout << "Remove called" << endl;
        // To remove, we need to check if the element is in the cache
        // if the element is not in the cache, we return false.
        // if the element is in the cache,
        //    we need to delete the element from the buf that is matched with the val key in the cache.'
        //    we need to delete the pair of val to buf iterator from our cache
        //    elemPos <- we need to find element in our randomLookupMap by looking up via randomLookupPositionMap
        //    we need to delete elemPos from our randomLookupMap
        //    we need to delete the elem from our randomLookupPositionMap.
        //    if elemPos == end, decrement end.
        //    if elemPos == head, we increment head.
        /// Complexity analysis:
        // checking if element is in cache O(1)
        // deleting from our buf is O(1) when we position the iterator exactly where we are deleting.
        // deleting from the cache is O(1) since we know the position we are deleting.
        // we need to delete 
        if (cache.find(val) == cache.end()) {
            return false;
        }
        auto cacheInsertionIterator = cache.find(val);
        buf.erase(cacheInsertionIterator->second);
        auto randomLookupMapPositionIterator = randomLookupPositionMap.find(val);
        int elemPos = randomLookupMapPositionIterator->second->first;
        // cout << "Elem pos: " << elemPos << endl;
        randomLookupMap.erase(elemPos);
        cache.erase(val);
        randomLookupPositionMap.erase(val);
        if (elemPos == end-1) {
            end--;
        } else if (elemPos == head) {
            head++;
        }
        return true;
    }
    
    int getRandom() {
        // randomPos <-- we get a random int from head to end.
        // while that random int is not in our randomLookupMap,
           // randomPos <-- we get a random int from head to end
        // we get the cacheInsertionIterator at randomPos from randomLookupMap
        // we return cacheInsertionIterator->second.
        srand(time(NULL));
        int randomPos = rand() % (end - head) + head;
        randomLookupMapIterator randomLookupIterator;
        while((randomLookupIterator = randomLookupMap.find(randomPos)) == randomLookupMap.end()) {
            // cout << "Miss on position : " << randomPos << endl;
            randomPos = rand() % (end - head) + head;
        }
        return randomLookupIterator->second->first;
    }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */

int main() {
    auto r = RandomizedSet();
    r.insert(1);
    r.insert(2);
    r.insert(3);
    r.insert(4);
    r.insert(5);
    r.insert(6);
    r.remove(2);
    r.insert(7);
    r.remove(6);
    int randInt = r.getRandom();
    cout << "R = " << randInt << endl;
}