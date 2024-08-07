class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        if (words.size() == 0) {
            return {};
        }
        deque<string> line;
        vector<string> lines;
        line.push_back(words[0]);
        stringstream res;
        int totalLineSize = words[0].size();
        int i = 1;
        while(line.size() || i < words.size()) {
            if (i < words.size()) {
                string wordsp = words[i];
                if (totalLineSize + (line.size()-1) + wordsp.size() <= maxWidth) {
                    line.push_back(wordsp);
                    totalLineSize += wordsp.size();
                    i += 1;
                } else {
                    int remainingSpace = maxWidth - totalLineSize;
                    int numspaces = line.size() - 1;
                    if (numspaces == 0) {
                        string padding = string(remainingSpace, ' ');
                        string frontword = line.front();
                        line.pop_front();
                        totalLineSize -= frontword.size();
                        res << frontword << padding;
                    } else {
                        int extraSpace = remainingSpace / numspaces;
                        int remainder = remainingSpace % numspaces;
                        while(line.size()) {
                            string frontword = line.front();
                            line.pop_front();
                            int extraPadAmount;
                            if (remainingSpace - extraSpace >= 0) {
                                extraPadAmount = extraSpace;
                                if (remainder > 0) {
                                    extraPadAmount += 1;
                                    remainder -= 1;
                                }
                                remainingSpace -= extraSpace;
                            }
                            string padding = string(extraPadAmount, ' ');
                            res << frontword;
                            if (line.size() > 0) {
                                res << padding;
                            }
                            totalLineSize -= frontword.size();
                        }
                    } // flush multiword deque
                    assert(totalLineSize == 0);
                    assert(line.size() == 0);
                    lines.push_back(res.str());
                    res.str("");
                } // flush deque
        } // while we still have words (aka not the last line)
        else {
            int remainingSpace = maxWidth - totalLineSize;
            
            while(line.size()) {
                cout << "Remaining space: " << remainingSpace << endl;
                string frontword = line.front();
                line.pop_front();
                res << frontword;
                if (line.size() >= 1) {
                    remainingSpace -= 1;
                    res << ' ';
                } else {
                    if (remainingSpace > 0) {
                        string finalPad = string(remainingSpace, ' ');
                        res << finalPad;
                    }

                    lines.push_back(res.str());
                    res.str("");
                }
            }
        } // handle last line.
        }
        return lines;
    }
};