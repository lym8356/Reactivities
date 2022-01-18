using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // Cancellation token used to capture user actions 
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // get activity from database
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // old way
                // activity.Title = request.Activity.Title ?? activity.Title;

                // using auto mapper
                _mapper.Map(request.Activity, activity);

                // save changes
                await _context.SaveChangesAsync();

                // return nothing 
                return Unit.Value;
            }
        }
    }
}