import { of } from "rxjs";
import { ISession } from "../shared";
import { VoterService } from "./voter.service"

describe ('VoterService', () => {
    let voterService:VoterService,
    mockHttp;
    beforeEach(()=>{
        mockHttp = jasmine.createSpyObj('mockHttp',['delete', 'post'])
        voterService = new VoterService(mockHttp);
    })
    

    describe('deleteVoter', ()=>{
        it('should remove voter from list of voters', ()=>{
            const session = { id: 6, voters: ['joe','john']}
            mockHttp.delete.and.returnValue(of(false))

            voterService.deleteVoter(3, <ISession>session, 'joe')
            expect(session.voters.length).toBe(1)
            expect(session.voters[0]).toBe('john')
        })

        it('should call http.delete with the right url', ()=>{
            const session = { id: 6, voters: ['joe','john']}
            mockHttp.delete.and.returnValue(of(false))

            voterService.deleteVoter(3, <ISession>session, 'joe')
            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe')
        })
    })

    describe('addVoter', () => {
        it('should call http.delete with the right url', ()=>{
            const session = { id: 6, voters: ['john']}
            mockHttp.post.and.returnValue(of(false))

            voterService.addVoter(3, <ISession>session, 'joe')
            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object))
        })
    })
})