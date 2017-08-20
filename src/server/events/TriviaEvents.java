/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.events;

/**
 *
 * @author Danny
 */
public class TriviaEvents {
    
    private boolean active;
    private String result;
    private byte event;
    
    public TriviaEvents() {
        
    }
    
    public void setEvent(byte g) {
        event = g;
    }
    
    public byte getEvent() {
        switch (event) {
            case 1: // Hitman
                return 1;
            case 2: // Blink
                return 2;
            case 3: // Unscramble
                return 3;
            case 4: // Reverse
                return 4;
            case 5: // SpeedType
                return 5;
            case 6: // Scat
		return 6;
            case 7: // NTI
		return 7;
        }
        return 0;
    }
    
    public void setResult(String res) {
        result = res;
    }

    public String getResult() {
        return result;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean act) {
        active = act;
    }
    
    
}
