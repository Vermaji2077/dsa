// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco

///////////////////////////////////////////////////////////////////////////////
// Import and export information used by the Javascript linter ESLint:
/* exported EventListener */
///////////////////////////////////////////////////////////////////////////////


class EventListener {
    events = {};

    addListener(kind, scope, func) {
        if (!this.events[kind]) {
            this.events[kind] = [];
        }
        let scopeFunctions = null;
        for (let i = 0; i < this.events[kind].length; i++) {
            if (this.events[kind][i].scope === scope) {
                scopeFunctions = this.events[kind][i];
                break;
            }
        }
        if (scopeFunctions == null) {
            scopeFunctions = {scope: scope, functions: []};
            this.events[kind].push(scopeFunctions);
        }
        for (let i = 0; i < scopeFunctions.functions.length; i++) {
            if (scopeFunctions.functions[i] === func) {
                return;
            }
        }
        scopeFunctions.functions.push(func);
    }

    removeListener(kind, scope, func) {
        if (!this.events[kind]) {
            return;
        }
        let scopeFunctions = null;
        for (let i = 0; i < this.events[kind].length; i++) {
            if (this.events[kind][i].scope === scope) {
                scopeFunctions = this.events[kind][i];
                break;
            }
        }
        if (scopeFunctions == null) {
            return;
        }
        for (let i = 0; i < scopeFunctions.functions.length; i++) {
            if (scopeFunctions.functions[i] === func) {
                scopeFunctions.functions.splice(i, 1);
                return;
            }
        }
    }

    fireEvent(kind, event) {
        // TODO:  Should add a deep clone here ...
        if (this.events[kind]) {
            for (let i = 0; i < this.events[kind].length; i++) {
                const objects = this.events[kind][i];
                const functs = objects.functions;
                const scope = objects.scope;
                for (let j = 0; j < functs.length; j++) {
                    const func = functs[j];
                    func.call(scope, event);
                }
            }
        }
    }
}
